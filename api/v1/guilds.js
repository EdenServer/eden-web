const { Router } = require('express');

const router = Router();

const { fetchGuildItems } = require('./utils/guilds');

router.get('/points', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 300000,
    },
    () => {
      return fetchGuildItems(req.app.locals.query, req.app.locals.pattern);
    }
  );

  res.send(cache);
});

module.exports = router;
