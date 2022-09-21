const parseMD = require('parse-md').default;
const fs = require('fs');
const { Router } = require('express');

const router = Router();

const request = require('request');
const scanner = require('portscanner');

const { getYells } = require('./utils/yells');

router.get('/status', async (req, res) => {
  try {
    let gameServerOnline = false;
    if (process.env.MOCK_GAME_SERVER_ONLINE === 'true') {
      gameServerOnline = true;
    } else {
      const status = await scanner.checkPortStatus(process.env.GAME_SERVER_PORT, process.env.GAME_SERVER_HOST);
      gameServerOnline = status === 'open';
    }

    if (gameServerOnline) {
      const query = 'SELECT COUNT(*) AS ct FROM accounts_sessions JOIN chars ON accounts_sessions.charid = chars.charid WHERE gmlevel = 0;';
      const online = await req.app.locals.query(query);
      return res.status(200).send(online[0].ct.toString());
    }

    return res.status(400).send();
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
});

router.get('/active', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 86400000, // 24 hours
    },
    async () => {
      try {
        const activeDays = await req.app.locals.query(
          'SELECT COUNT(DISTINCT charid) AS active_players, CAST(login_time AS DATE) AS date FROM audit_iprecord WHERE login_time BETWEEN CAST(DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 15 DAY) AS DATE) AND CAST(DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY) AS DATE) GROUP BY date;'
        );
        if (activeDays == null || activeDays.length < 1) {
          return res.status(404).send();
        }
        const sum = activeDays.reduce((s, day) => s + parseInt(day.active_players, 10), 0);
        return Math.round(sum / activeDays.length).toString();
      } catch {
        return res.status(500).send();
      }
    }
  );

  res.send(cache);
});

router.get('/yells', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 30000, // 30 seconds
    },
    () => {
      return getYells(req.app.locals.query);
    }
  );

  res.send(cache);
});

router.post('/contact', (req, res) => {
  return res.status(404).send();
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

  request(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${verify}&remoteip=${req.headers['x-forwarded-for']}`,
    {
      method: 'POST',
      body: {},
      json: true,
    },
    (recaptchError, recaptchResponse) => {
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

          request(
            group,
            {
              method: 'POST',
              body: JSON.stringify({
                embeds: [contact],
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            },
            (discordError, _discordResponse) => {
              if (!discordError) {
                res.send();
              } else {
                res.status(400).send();
              }
            }
          );
        }
      } else {
        res.status(400).send();
      }
    }
  );
});

router.get('/config', async (req, res) => {
  const cache = await req.app.locals.cache.fetch('/config', () => {
    return require('./config');
  });

  res.send(cache);
});

router.get('/news', async (req, res) => {
  const maxAmountOfPosts = 5;
  const newsFolder = './news';

  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 300000, // 5 minutes
    },
    () => {
      let posts = [];
      let currentDate = new Date();

      const files = fs.readdirSync(newsFolder);
      files.forEach(file => {
        const fileContents = fs.readFileSync(`${newsFolder}/${file}`, 'utf8');
        let post = parseMD(fileContents);
        let date = Date.parse(post.metadata.date);

        if (date > currentDate) {
          // news that's dated in the future shouldn't show up
          return;
        }

        posts.push(post);
      });

      posts.sort((p1, p2) => p2.metadata.date - p1.metadata.date);
      posts = posts.slice(0, maxAmountOfPosts);
      return posts;
    }
  );

  res.send(cache);
});

module.exports = router;
