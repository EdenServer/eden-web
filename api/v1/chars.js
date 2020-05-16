const { Router } = require('express');

const {
  getCharCrafts,
  getCharEquip,
  getCharBazaar,
  getCharAH,
  getCharData,
  fetchChars,
} = require('./utils/chars');

const router = Router();

router.get('/', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 30000, // 30 seconds
    },
    () => {
      const { search = '', limit = 10, offset = 0, online } = req.query;
      return fetchChars(req.app.locals.query, {
        search,
        limit,
        online: ['true', true].includes(online) ? true : false,
        offset,
      });
    }
  );

  res.send(cache);
});

router.get('/:charname/equip', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    return getCharEquip(req.app.locals.query, req.params.charname);
  });

  res.send(cache);
});

router.get('/:charname/bazaar', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    return getCharBazaar(req.app.locals.query, req.params.charname);
  });

  res.send(cache);
});

router.get('/:charname/ah', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 300000, // 5 minutes
    },
    () => {
      return getCharAH(req.app.locals.query, req.params.charname);
    }
  );

  res.send(cache);
});

router.get('/:charname/crafts', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    return getCharCrafts(req.app.locals.query, req.params.charname);
  });

  res.send(cache);
});

router.get('/:charname', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    return getCharData(req.app.locals.query, req.params.charname);
  });

  res.send(cache);
});

module.exports = router;
