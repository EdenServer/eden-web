import owner from '../../../client/src/owner';

const loadItems = async query => {
  try {
    const statement = `SELECT *, b.itemid AS id, b.name AS name,
                IF(a.itemid IS NOT NULL, 1, 0) AS isArmor,
                IF(f.itemid IS NOT NULL, 1, 0) AS isFurnishing,
                IF(l.itemid IS NOT NULL, 1, 0) AS hasLatents,
                IF(m.itemid IS NOT NULL, 1, 0) AS hasMods,
                IF(mp.itemid IS NOT NULL, 1, 0) AS hasPetMods,
                IF(p.itemid IS NOT NULL, 1, 0) AS isPupAttachment,
                IF(u.itemid IS NOT NULL, 1, 0) AS isUsable,
                IF(w.itemid IS NOT NULL, 1, 0) AS isWeapon
            FROM item_basic AS b
            LEFT JOIN item_armor AS a ON b.itemid  = a.itemid
            LEFT JOIN item_furnishing AS f ON b.itemid = f.itemid
            LEFT JOIN item_latents AS l ON b.itemid = l.itemid
            LEFT JOIN item_mods AS m ON b.itemid = m.itemid
            LEFT JOIN item_mods_pet AS mp ON b.itemid = mp.itemid
            LEFT JOIN item_puppet AS p ON b.itemid = p.itemid
            LEFT JOIN item_usable AS u ON b.itemid = u.itemid
            LEFT JOIN item_weapon AS w ON b.itemid = w.itemid;`;
    return await query(statement);
  } catch (error) {
    console.error('Error while loading items', error);
    return [];
  }
};

const loadItemKeys = async query => {
  try {
    const statement = `SELECT item_basic.itemid, item_basic.name, level, jobs FROM item_basic
            LEFT JOIN item_armor ON item_basic.itemid = item_armor.itemid;`;
    const results = await query(statement);
    const map = {};
    results.forEach(
      r =>
        (map[r.itemid] = {
          key: r.name,
          level: r.level,
          jobs: r.jobs,
        })
    );
    return map;
  } catch (error) {
    console.error('Error while loading item keys', error);
    return {};
  }
};

const getRecipeFor = async (query, itemname) => {
  try {
    const statement = `SELECT * FROM synth_recipes AS r
            JOIN item_basic AS b ON r.result = b.itemid OR resultHQ1 = b.itemid OR resultHQ2 = b.itemid OR resultHQ3 = b.itemid
            WHERE b.name = ?;`;
    return await query(statement, [itemname]);
  } catch (error) {
    console.error('Error while getting specific recipe', error);
    return [];
  }
};

const getLastSold = async (query, itemname, stack = 0, count = 10) => {
  try {
    const statement = `SELECT name, seller_name, buyer_name, sale, sell_date FROM server_auctionhouse
            JOIN item_basic on item_basic.itemid = server_auctionhouse.itemid
            WHERE sell_date != 0 AND item_basic.name = ? AND stack = ?
            ORDER BY sell_date DESC LIMIT ?;`;
    return await query(statement, [itemname, stack, count]);
  } catch (error) {
    console.error('Error while getting last sold', error);
    return [];
  }
};

const getBazaars = async (query, itemname) => {
  try {
    const statement = `SELECT charname, bazaar FROM char_inventory AS i
            JOIN item_basic AS b ON b.itemid = i.itemid
            JOIN chars AS c ON c.charid = i.charid
            WHERE bazaar != 0 AND b.name = ? ORDER BY charname ASC;`;
    return await query(statement, [itemname]);
  } catch (error) {
    console.error('Error while getting bazaars', error);
    return [];
  }
};

var ownersCache = {};

const refreshOwnersCache = async query => {
  const statement = `SELECT i.itemid, charname FROM chars c
        JOIN char_inventory i ON i.charid = c.charid
        JOIN accounts a ON a.id = c.accid
        WHERE i.itemid IN (${owner.owner_item_list.join(',')})
        AND c.deleted IS NULL
        AND gmlevel = 0
        AND a.status <= 1
        ORDER BY charname ASC;`;

  const result = await query(statement);

  var updatedCache = {};
  for (var row of result) {
    if (!(row.itemid in updatedCache)) {
      updatedCache[row.itemid] = [];
    }
    updatedCache[row.itemid].push(row.charname);
  }
  ownersCache = updatedCache;
};

const getOwners = async (query, itemid) => {
  // Prevent any funny business
  if (!owner.owner_item_list.includes(itemid)) {
    return [];
  }
  try {
    return ownersCache[itemid];
  } catch (error) {
    console.error('Error while getting item owners', error);
    return [];
  }
};

const getJobs = (level, jobs, idToStr) => {
  if (level && jobs) {
    const vals = [];
    for (let job = 0; job < 22; job++) {
      if ((jobs & Math.pow(2, job)) !== 0) {
        vals.push(idToStr[job + 1]);
      }
    }
    return `Lv ${level} ${vals.join(' ')}`;
  } else {
    return null;
  }
};

export {
  loadItems,
  loadItemKeys,
  getRecipeFor,
  getLastSold,
  getBazaars,
  getOwners,
  refreshOwnersCache,
  getJobs,
};
