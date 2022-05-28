const { Router } = require('express');

const router = Router();

const lists = require('./lists');
const utils = require('./utils');

router.get('/', async (req, res) => {
  const cache = await req.app.locals.cache.fetch(req.originalUrl, () => {
    const { search = '', limit = 10, offset = 0 } = req.query;
    const items = Object.values(lists.items)
      .filter(i => {
        if (i.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || i.sort.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          if (!req.app.locals.itemKeys[i.id]) {
            console.warn(`itemid ${i.id} does not have an entry in itemKeys`);
            return false;
          } else {
            return true;
          }
        }

        return false;
      })
      .sort(function (a, b) {
        return a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0;
      });

    return {
      total: items.length,
      items: items.splice(offset, limit).map(item => {
        const key = req.app.locals.itemKeys[item.id].key;
        return {
          id: item.id,
          name: item.name,
          sort: item.sort,
          key,
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
    return utils.items.getLastSold(req.app.locals.query, utils.items.safeDecode(itemname), stack, 10);
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
    const item = Object.values(req.app.locals.items).filter(i => {
      return i.name.toLowerCase() === utils.items.safeDecode(itemname).toLowerCase();
    })[0];

    if (item) {
      const response = lists.items[item.id];
      const info = req.app.locals.itemKeys[item.id];
      const stackable = Boolean(item.stackSize > 1);
      const armor = utils.items.getJobs(info.level, info.jobs, utils.chars.jobIdToString);
      return Object.assign({ armor, stackable }, response, {
        key: utils.items.safeDecode(itemname).toLowerCase(),
      });
    }
  });

  res.send(cache);
});

module.exports = router;
