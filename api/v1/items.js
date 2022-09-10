const { Router } = require('express');

const router = Router();

const utils = require('./utils');

function getItem(req, key) {
  const safeKey = utils.items.safeDecode(key);
  return req.app.locals.items.byId[safeKey] ?? req.app.locals.items.byName[safeKey];
}

function getItemIdFromKey(req, itemkey) {
  return getItem(req, itemkey)?.id;
}

router.get('/', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { search = '', limit = 10, offset = 0 } = req.query;
    const items = Object.values(req.app.locals.items.byId)
      .filter(i => {
        if (i.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1 || i.sort.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }

        return false;
      })
      .sort(function (a, b) {
        return a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0;
      });

    return {
      total: items.length,
      items: items.splice(offset, limit).map(item => {
        return {
          id: item.id,
          name: item.displayName,
          sort: item.sort,
          key: item.id,
        };
      }),
    };
  });

  res.send(cache);
});

router.get('/:itemkey/ah', async (req, res) => {
  const { itemkey = '' } = req.params;
  const stack = req.query.stack === 'true' ? 1 : 0;
  const cache = await req.app.locals.cache.fetch(`${req.originalUrl}?stack=${stack}`, () => {
    return utils.items.getLastSold(req.app.locals.query, getItemIdFromKey(req, itemkey), stack, 10);
  });

  res.send(cache);
});

router.get('/:itemkey/crafts', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 28800000, // 8 hours
    },
    () => {
      const { itemkey = '' } = req.params;
      return utils.items.getRecipeFor(req.app.locals.query, getItemIdFromKey(req, itemkey));
    }
  );

  res.send(cache);
});

router.get('/:itemkey/bazaar', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { itemkey = '' } = req.params;
    return utils.items.getBazaars(req.app.locals.query, getItemIdFromKey(req, itemkey));
  });

  res.send(cache);
});

router.get('/:itemid/owners', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { itemid = 0 } = req.params;
    return utils.items.getOwners(req.app.locals.query, parseInt(utils.items.safeDecode(itemid)));
  });

  res.send(cache);
});

router.get('/:itemkey', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { itemkey = '' } = req.params;
    const item = getItem(req, itemkey);

    if (item) {
      const { desc, id, displayName, sort, level, jobs } = item;
      return {
        desc,
        id,
        name: displayName,
        sort,
        stackable: Boolean(item.stackSize > 1),
        armor: utils.items.getJobs(level, jobs, utils.chars.jobIdToString),
        key: id,
      };
    }
  });

  res.send(cache);
});

module.exports = router;
