const { Router } = require('express');

const router = Router();

const axios = require('axios');
const scanner = require('portscanner');

const { getYells } = require('./utils/yells');
const { validateJWT } = require('./utils/accounts');

const MAX_NUMBER_OF_POSTS = 5;

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
          return '0';
        }
        const sum = activeDays.reduce((s, day) => s + parseInt(day.active_players, 10), 0);
        return Math.round(sum / activeDays.length).toString();
      } catch {
        return '0';
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

  axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${verify}&remoteip=${req.headers['x-forwarded-for']}`,
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(recaptchResponse => {
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

        axios({
          method: 'post',
          url: group,
          data: {
            embeds: [contact],
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => res.send())
          .catch(() => res.status(400).send());
      }
    })
    .catch(recaptchError => {
      res.status(400).send();
    });
});

router.get('/config', async (req, res) => {
  const cache = await req.app.locals.cache.fetch('/config', () => {
    return require('./config');
  });

  res.send(cache);
});

router.get('/news', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 300000, // 5 minutes
    },
    async () => {
      const statement = `
        SELECT post_id, DATE_FORMAT(date, '%Y-%m-%dT%T.000Z') AS date, author, title, markdown
        FROM web_posts
        WHERE (expiration IS NULL OR expiration > UTC_TIMESTAMP) AND date < UTC_TIMESTAMP AND deleted = 0
        ORDER BY date DESC
        LIMIT ?;
      `;
      const posts = await req.app.locals.query(statement, [MAX_NUMBER_OF_POSTS]);
      return posts.map(post => ({
        content: post.markdown,
        metadata: {
          id: post.post_id,
          title: post.title,
          author: post.author,
          date: post.date,
        },
      }));
    }
  );

  res.send(cache);
});

router.post('/write', validateJWT, async (req, res) => {
  try {
    if (req.jwt.privileges.includes('WEB_SCRIBE')) {
      const { author, date, expiration, title, markdown } = req.body;
      const statement = 'INSERT INTO web_posts (`author_id`,`date`,`author`,`title`,`markdown`,`expiration`) VALUES (?, ?, ?, ?, ?, ?)';
      const results = await req.app.locals.query(statement, [req.jwt.id, date, author, title, markdown, expiration]);
      if (results.affectedRows) {
        req.app.locals.cache.clear('/api/v1/misc/news');
        res.send();
      } else {
        res.status(500).send();
      }
    } else {
      res.status(401).send();
    }
  } catch {
    res.status(500).send();
  }
});

router.post('/trash', validateJWT, async (req, res) => {
  try {
    if (req.jwt.privileges.includes('WEB_SCRIBE')) {
      const statement = 'UPDATE web_posts SET deleted = 1 WHERE post_id = ?';
      const results = await req.app.locals.query(statement, [req.body.id]);
      if (results.affectedRows) {
        req.app.locals.cache.clear('/api/v1/misc/news');
        res.send();
      } else {
        res.status(500).send();
      }
    } else {
      res.status(401).send();
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
