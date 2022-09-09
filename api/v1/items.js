const { Router } = require('express');

const router = Router();

const utils = require('./utils');

function getItem(req, key) {
  const safeKey = utils.items.safeDecode(key);
  return req.app.locals.items.byName[safeKey] ?? req.app.locals.items.byId[safeKey];
}

function getItemIdFromName(req, itemname) {
  return getItem(req, itemname)?.id;
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

router.get('/:itemname/ah', async (req, res) => {
  const { itemname = '' } = req.params;
  const stack = req.query.stack === 'true' ? 1 : 0;
  const cache = await req.app.locals.cache.fetch(`${req.originalUrl}?stack=${stack}`, () => {
    return utils.items.getLastSold(req.app.locals.query, getItemIdFromName(req, itemname), stack, 10);
  });

  res.send(cache);
});

router.get('/:itemname/crafts', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(
    {
      key: req.originalUrl,
      interval: 28800000, // 8 hours
    },
    () => {
      const { itemname = '' } = req.params;
      return utils.items.getRecipeFor(req.app.locals.query, utils.items.safeDecode(itemname));
    }
  );

  res.send(cache);
});

router.get('/:itemname/bazaar', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { itemname = '' } = req.params;
    return utils.items.getBazaars(req.app.locals.query, utils.items.safeDecode(itemname));
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

router.get('/:itemname', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { itemname = '' } = req.params;
    const item = getItem(req, itemname);

    if (item) {
      const { desc, id, displayName, sort, level, jobs } = item;
      return {
        desc,
        id,
        name: displayName,
        sort,
        stackable: Boolean(item.stackSize > 1),
        armor: utils.items.getJobs(level, jobs, utils.chars.jobIdToString),
        key: utils.items.safeDecode(itemname).toLowerCase(),
      };
    }
  });

  res.send(cache);
});

module.exports = router;
