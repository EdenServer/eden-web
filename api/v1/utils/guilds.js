const { guilds, ranks, items } = require('../lists');

function getVanaTime() {
  return (Date.now() - 1009810800000 - 900000) / 1000; //Adjusted to be delayed 15 minutes
}

function getAdjustedRank(initialRank) {
  return (((getVanaTime() / (60 * 60 * 24)) % (initialRank + 4)) + 1) % (initialRank + 4);
}

async function getPattern(query, patternCache) {
  if (await patternCache.isValidPattern()) {
    return await patternCache.get();
  } else {
    const pattern = await query('SELECT value FROM server_variables WHERE name = "[GUILD]pattern"');
    await patternCache.update(pattern);
    return await patternCache.get();
  }
}

function sortGuildItems(results) {
  const gpitems = {};
  var previousTier = 0;
  Object.keys(guilds).forEach(guildid => {
    gpitems[guilds[guildid]] = [];
  });

  results.forEach(item => {
    if (item.rank == previousTier) {
      //Ignore HQ items
    } else {
      previousTier = item.rank;
      if (ranks[item.rank] == undefined) {
        console.log('Undefined rank', item.rank);
      }
      gpitems[guilds[item.guildid]].push({
        id: item.itemid,
        item: items[item.itemid].name,
        rank: ranks[item.rank],
        rankid: item.rank,
        points: item.points,
        max_points: item.max_points,
      });
    }
  });
  return gpitems;
}

function parseGuildItems(items) {
  const gpitems = {};
  Object.keys(guilds).forEach(guildid => {
    gpitems[guilds[guildid]] = [];
    for (var x = 0; x < 7; x++) {
      var adjustedRank = Math.floor(getAdjustedRank(x));
      items[guilds[guildid]].forEach(gpItem => {
        if (adjustedRank == gpItem.rankid) {
          gpitems[guilds[guildid]].push(gpItem);
        }
      });
    }
  });
  return gpitems;
}

const fetchGuildItems = async (query, patternCache) => {
  try {
    const pattern = await getPattern(query, patternCache);
    const statement = `SELECT guildid, itemid, rank, points, max_points
    FROM guild_item_points
    WHERE pattern = ?;`;
    const results = await query(statement, [`${pattern[0].value}`]);
    const gpitems = sortGuildItems(results);
    const parseditems = parseGuildItems(gpitems);
    return parseditems;
  } catch (error) {
    console.error('Error while fetching Guild Point items', error);
    return { gpitems: [] };
  }
};

module.exports = {
  fetchGuildItems,
};
