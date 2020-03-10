const { Router } = require('express');

const router = Router();

const request = require('request');
const scanner = require('portscanner');

const { getYells } = require('./utils/yells');

router.get('/status', (req, res) => {
    try {
        scanner.checkPortStatus(54231, 'localhost', async (error, status) => {
            if (!error && status === 'open') {
                const online = await req.app.locals.query('SELECT COUNT(*) AS ct FROM accounts_sessions;');
                return res.status(200).send(online[0].ct.toString());
            }
            res.status(404).send();
        });
    } catch (error) {
        res.status(404).send();
    }
});

router.get('/yells', async (req, res) => {
    const cache = await req.app.locals.cache.fetch({
        key: req.originalUrl,
        interval: 30000, // 30 seconds
    }, () =>{
        return getYells(req.app.locals.query);
    });

    res.send(cache);
});

router.post('/contact', (req, res) => {
    const { name, email, message, verify, subject } = req.body;
    let group = null;
    switch (subject) {
        case 'corruption':
            group = process.env.OC_CONTACT_WEBHOOK;
            break;
        case 'report':
        case 'appeal':
            group = process.env.GM_CONTACT_WEBHOOK;
            break;
        case 'password':
        case 'support':
        case 'other':
        default:
            group = process.env.CM_CONTACT_WEBHOOK;
            break;
    }

    if (!group) {
        return res.status(400).send();
    }

    request(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${verify}&remoteip=${req.headers['x-forwarded-for']}`, {
        method: 'POST',
        body: {},
        json: true,
    }, (recaptchError, recaptchResponse) => {
        if (!recaptchError) {
            // Recaptcha3 has passed.
            if (recaptchResponse.body.success) {
                const contact = {
                    author: {
                        name: 'Anonymous',
                        icon_url: 'https://edenxi.com/public/models/unknown.jpg.webp',
                    },
                    title: subject,
                    color: 9862070,
                    description: 'No Content',
                };

                if (name) {
                    contact.author.name = name;
                }

                if (email) {
                    contact.author.name += ` (${email})`;
                }

                if (message) {
                    contact.description = message;
                }

                request(group, {
                    method: 'POST',
                    body: JSON.stringify({
                        embeds: [contact],
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }, (discordError, _discordResponse) => {
                    if (!discordError) {
                        res.send();
                    } else {
                        res.status(400).send();
                    }
                });
            }
        } else {
            res.status(400).send();
        }
    })
});

router.get('/config', async (req, res) => {
    const cache = await req.app.locals.cache.fetch('/config', () =>{
        return require('./config');
    });

    res.send(cache);
});

module.exports = router;
