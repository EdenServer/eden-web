const jwt = require('jsonwebtoken');
const request = require('request');
const { Router } = require('express');

const router = Router();

const {
  formatAvatar,
  formatJobString,
  titleIdToString,
} = require('./utils/chars');
const { getJWTForAccountId } = require('./utils/accounts');

const validate = (req, res, next) => {
  const token = req.headers.authorization.replace(/^Bearer\s/, '');
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (!error) {
      req.jwt = decoded;
      next();
    } else {
      res.status(401).send();
    }
  });
};

router.get('/profile', validate, async (req, res) => {
  try {
    const statement = `SELECT *, IF(accounts_sessions.charid IS NULL, 0, 1) AS online FROM chars
            JOIN char_stats ON chars.charid = char_stats.charid
            JOIN char_look ON chars.charid = char_look.charid
            LEFT JOIN accounts_sessions on chars.charid = accounts_sessions.charid
            WHERE chars.accid = ? AND deleted IS NULL;`;
    const results = await req.app.locals.query(statement, [req.jwt.id]);
    const chars = results.map(char => ({
      name: char.charname,
      online: char.online,
      title: titleIdToString(char.title),
      job: formatJobString(char),
      avatar: formatAvatar(char),
    }));
    const token = await getJWTForAccountId(req.app.locals.query, req.jwt.id);
    const { id, login, email, timecreate, timelastmodify } = jwt.decode(token);
    res.send({
      jwt: token,
      profile: Object.assign(
        { id, login, email, timecreate, timelastmodify },
        { chars }
      ),
    });
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/register', async (error, req, res) => {
  const disallowedIP = [];

  const {
    username,
    password,
    email,
    confirmUsername,
    confirmPassword,
    confirmEmail,
    verify,
    code,
    discord,
  } = req.body;

  /** common origins attemping to register
   * https://www.edenxi.com/tools
   * https://edenxi.com/tools
   * http://www.edenxi.com/tools
   * http://play.edenxi.com/tools
   */
  try {
    const servercodequery = 'SELECT code FROM code;';
    const servercode = await req.app.locals.query(servercodequery);
    const codebool = [servercode === code];

    const tests = [
      req.headers.referer === 'https://www.edenxi.com/tools' ||
        req.headers.referer === 'https://edenxi.com/tools',
      !disallowedIP.includes(req.headers['x-forwarded-for']),
      password === confirmPassword,
      username.toLowerCase() === confirmUsername.toLowerCase(),
      email.toLowerCase() === confirmEmail.toLowerCase(),
      username.length >= 6 && username.length <= 15,
      password.length >= 6 && password.length <= 15,
      !!username,
      !!verify,
      servercode === code,
    ];
    4;
    if (!!tests.includes(false)) {
      res.json({
        status: 'ERROR',
        errors: {
          server:
            'Your browser sent bad data. Please try again on a different browser.',
        },
      });
    }
    //bypassed verify test for development
    //verify !getcode
    if (!codebool) {
      return res.json({
        status: 'ERROR',
        errors: {
          server:
            'Invalid registration code. Obtain one from an established player or by asking for one on the Eden Discord.',
        },
      });
    } else {
      // All pre-tests have passed. Validate the Recaptcha3.
      request(
        {
          url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${verify}&remoteip=${req.headers['x-forwarded-for']}`,
          method: 'POST',
          body: {},
          json: true,
        },
        async error => {
          if (error) {
            return res.json({
              status: 'ERROR',
              errors: { server: 'An unknown error occured. (1)' },
            });
          }

          // Recaptcha3 has passed. Validate the DB entry.
          if (resp.body.success) {
            try {
              // attempt to register the account
              const statement =
                'INSERT INTO accounts (`login`,`password`,`email`,`email2`,`discord`) VALUES (?, PASSWORD(?), ?, ?,?);';
              const results = await req.app.locals.query(statement, [
                username,
                password,
                email,
                email,
                discord,
              ]);
              if (results.affectedRows) {
                const infoStatement = `SELECT id FROM accounts WHERE login = ?;`;
                const info = await req.app.locals.query(infoStatement, [
                  username,
                ]);
                const token = await getJWTForAccountId(
                  req.app.locals.query,
                  info[0].id
                );
                const {
                  id,
                  login,
                  email,
                  discord,
                  timecreate,
                  timelastmodify,
                } = jwt.decode(token);
                return res.json({
                  status: 'SUCCESS',
                  jwt: token,
                  profile: Object.assign({
                    id,
                    login,
                    email,
                    discord,
                    timecreate,
                    timelastmodify,
                    chars: [],
                  }),
                  errors: {},
                });
              } else {
                return res.json({
                  status: 'ERROR',
                  errors: {
                    server: 'Username already taken. Try something else. (1)',
                  },
                });
              }
            } catch (error) {
              return res.json({
                status: 'ERROR',
                errors: {
                  server: 'Username already taken. Try something else. (2)',
                },
              });
            }
          } else {
            return res.json({
              status: 'ERROR',
              errors: {
                server:
                  'Here be bots! You failed the ReCAPTCHA test. Make sure to fill out the form with valid data within a couple minutes.',
              },
            });
          }
        }
      );
    }
  } catch (err) {
    return res.json({
      status: 'ERROR',
      errors: { server: 'An unknown error occured. (2)' },
    });
  }
});

router.put('/email', validate, async (req, res) => {
  try {
    const statement = 'UPDATE accounts SET `email` = ? WHERE id = ?;';
    const result = await req.app.locals.query(statement, [
      req.headers.email,
      req.jwt.id,
    ]);
    if (result.affectedRows) {
      const token = await getJWTForAccountId(req.app.locals.query, req.jwt.id);
      res.send(token);
    }
  } catch (error) {
    res.status(401).send();
  }
});

router.put('/password', validate, async (req, res) => {
  try {
    const statement =
      'UPDATE accounts SET `password` = PASSWORD(?) WHERE id = ?;';
    const result = await req.app.locals.query(statement, [
      req.headers.password,
      req.jwt.id,
    ]);
    if (result.affectedRows) {
      const token = await getJWTForAccountId(req.app.locals.query, req.jwt.id);
      res.send(token);
    }
  } catch (error) {
    res.status(401).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, pass } = req.headers;
    const statement =
      'SELECT * FROM accounts WHERE `login` = ? AND `password` = PASSWORD(?) AND status = 1;';
    const results = await req.app.locals.query(statement, [user, pass]);
    if (results.length === 1) {
      const token = await getJWTForAccountId(
        req.app.locals.query,
        results[0].id
      );
      res.send(token);
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
