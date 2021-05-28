const { titles } = require('../lists');

const titleIdToString = titleid => {
  const title = titles[titleid];
  if (!title) {
    return 'Error';
  }

  return title;
};

const jobIdToString = {
  0: null,
  1: 'WAR',
  2: 'MNK',
  3: 'WHM',
  4: 'BLM',
  5: 'RDM',
  6: 'THF',
  7: 'PLD',
  8: 'DRK',
  9: 'BST',
  10: 'BRD',
  11: 'RNG',
  12: 'SAM',
  13: 'NIN',
  14: 'DRG',
  15: 'SMN',
  16: 'BLU',
  17: 'COR',
  18: 'PUP',
  19: 'DNC',
  20: 'SCH',
  21: 'GEO',
  22: 'RUN',
};

const formatJobString = char => {
  if ((char.nameflags & 4096) === 4096) {
    return '?/?';
  }

  let job = `${jobIdToString[char.mjob]}${char.mlvl}`;
  if (char.sjob !== 0) {
    job = job.concat(`/${jobIdToString[char.sjob]}${char.slvl}`);
  }

  return job;
};

const formatAvatar = char => {
  const race = ['', 'hm', 'hf', 'em', 'ef', 'tm', 'tf', 'mf', 'gm'][char.race];
  const face = Math.floor((char.face + 2) / 2);
  const hair = ['a', 'b'][char.face % 2];
  return `${race}${face}${hair}`;
};

const skillIdToCraft = skillid => {
  switch (skillid) {
    case 48:
      return 'Fishing';
    case 49:
      return 'Woodworking';
    case 50:
      return 'Smithing';
    case 51:
      return 'Goldsmithing';
    case 52:
      return 'Clothcraft';
    case 53:
      return 'Leathercraft';
    case 54:
      return 'Bonecraft';
    case 55:
      return 'Alchemy';
    case 56:
      return 'Cooking';
    case 57:
      return 'Synergy';
    default:
  }

  return 'Error';
};

const addExtraCharData = chars => {
  const online = {};
  const all = {};

  Object.keys(chars.online).forEach(charname => {
    const char = chars.online[charname];
    online[charname] = Object.assign({}, char, {
      avatar: formatAvatar(char),
    });
  });
  Object.keys(chars.all).forEach(charname => {
    const char = chars.all[charname];
    all[charname] = Object.assign({}, char, { avatar: formatAvatar(char) });
  });

  return { online, all };
};

const getCharCrafts = async (query, charid) => {
  try {
    const statement = `SELECT skillid, value, rank FROM char_skills AS s
            JOIN chars AS c ON c.charid = s.charid
            WHERE skillid BETWEEN 48 AND 57 AND deleted IS null AND charname = ?;`;
    const response = await query(statement, [charid]);
    const crafts = {
      Fishing: 0,
      Woodworking: 0,
      Smithing: 0,
      Goldsmithing: 0,
      Clothcraft: 0,
      Leathercraft: 0,
      Bonecraft: 0,
      Alchemy: 0,
      Cooking: 0,
      Synergy: 0,
    };
    response.forEach(row => {
      crafts[skillIdToCraft(row.skillid)] = row.value / 10;
    });
    return crafts;
  } catch (error) {
    console.error('Error while getting character crafts', error);
    return {};
  }
};

const getCharAH = async (query, charname, limit = 10) => {
  try {
    const statement = `SELECT name, CASE WHEN stack = 1 THEN stacksize ELSE 1 END AS stack_size,
                              seller_name, buyer_name, sale, sell_date FROM server_auctionhouse
            JOIN item_basic on item_basic.itemid = server_auctionhouse.itemid
            WHERE sell_date != 0 AND (seller_name = ? OR buyer_name = ?) ORDER BY sell_date DESC LIMIT ?;`;
    return await query(statement, [charname, charname, limit]);
  } catch (error) {
    console.error('Error while getting character AH', error);
    return [];
  }
};

const getCharBazaar = async (query, charname) => {
  try {
    const statement = `SELECT b.name, i.bazaar FROM char_inventory AS i
            JOIN chars AS c ON c.charid = i.charid
            JOIN item_basic AS b ON b.itemid = i.itemid
            WHERE bazaar != 0 AND charname = ? ORDER BY b.name ASC`;
    return await query(statement, [charname]);
  } catch (error) {
    console.error('Error while getting character bazaar', error);
    return [];
  }
};

const equipSlotIdToKey = equipslotid => {
  switch (equipslotid) {
    case 0:
      return 'main';
    case 1:
      return 'sub';
    case 2:
      return 'ranged';
    case 3:
      return 'ammo';
    case 4:
      return 'head';
    case 5:
      return 'body';
    case 6:
      return 'hands';
    case 7:
      return 'legs';
    case 8:
      return 'feet';
    case 9:
      return 'neck';
    case 10:
      return 'waist';
    case 11:
      return 'ear1';
    case 12:
      return 'ear2';
    case 13:
      return 'ring1';
    case 14:
      return 'ring2';
    case 15:
      return 'back';
    case 16:
      return 'ls1';
    case 17:
      return 'ls2';
    default:
  }

  return 'error';
};

const mapEquipToObject = equip => {
  // Build an array of equipment or null slots
  let baseEquip = {
    main: { equipslotid: 0 },
    sub: { equipslotid: 1 },
    ranged: { equipslotid: 2 },
    ammo: { equipslotid: 3 },
    head: { equipslotid: 4 },
    body: { equipslotid: 5 },
    hands: { equipslotid: 6 },
    legs: { equipslotid: 7 },
    feet: { equipslotid: 8 },
    neck: { equipslotid: 9 },
    waist: { equipslotid: 10 },
    ear1: { equipslotid: 11 },
    ear2: { equipslotid: 12 },
    ring1: { equipslotid: 13 },
    ring2: { equipslotid: 14 },
    back: { equipslotid: 15 },
    ls1: { equipslotid: 16 },
    ls2: { equipslotid: 17 },
  };
  equip.forEach(e => (baseEquip[equipSlotIdToKey(e.equipslotid)] = e));
  return baseEquip;
};

const getCharEquip = async (query, charname) => {
  try {
    const statement = `SELECT equipslotid, b.itemid, b.name, i.signature FROM char_equip AS e
            JOIN char_stats AS s ON s.charid = e.charid AND s.mjob = e.jobid
            JOIN char_inventory AS i ON e.charid = i.charid AND e.containerid = i.location AND e.slotid = i.slot
            JOIN item_basic AS b ON i.itemId = b.itemid
            JOIN chars AS c ON c.charid = s.charid
            WHERE charname = ? AND deleted IS NULL;`;
    const response = await query(statement, [charname]);
    return mapEquipToObject(response);
  } catch (error) {
    console.error('Error while getting character equipment', error);
    return {};
  }
};

const getCharData = async (query, charname) => {
  try {
    const statement = `SELECT *, chars.charid AS charid, chars.accid AS accid, IF(accounts_sessions.charid IS NULL, 0, 1) AS \`isOnline\` FROM chars
            JOIN char_stats ON chars.charid = char_stats.charid
            JOIN char_look ON chars.charid = char_look.charid
            JOIN char_jobs ON chars.charid = char_jobs.charid
            JOIN char_profile ON chars.charid = char_profile.charid
            LEFT JOIN accounts_sessions on chars.charid = accounts_sessions.charid
            WHERE chars.deleted IS NULL AND gmlevel = 0 AND charname = ?;`;
    const response = await query(statement, [charname]);
    if (response.length === 1) {
      const char = response[0];
      return {
        id: char.charid,
        name: char.charname,
        nation: char.nation,
        mentor: char.mentor,
        nameflags: char.nameflags, // TODO: put flag strings in array
        title: titles[char.title],
        bazzarMessage: char.bazzar_message,
        jobString: formatJobString(char),
        avatar: formatAvatar(char),
        online: char.isOnline,
        jobs: {
          WAR: char.war,
          MNK: char.mnk,
          WHM: char.whm,
          BLM: char.blm,
          RDM: char.rdm,
          THF: char.thf,
          PLD: char.pld,
          DRK: char.drk,
          BST: char.bst,
          BRD: char.brd,
          RNG: char.rng,
          SAM: char.sam,
          NIN: char.nin,
          DRG: char.drg,
          SMN: char.smn,
          BLU: char.blu,
          COR: char.cor,
          PUP: char.pup,
          DNC: char.dnc,
          SCH: char.sch,
        },
        ranks: {
          sandoria: char.rank_sandoria,
          bastok: char.rank_bastok,
          windurst: char.rank_windurst,
        },
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error while fetching characters', error);
    return {};
  }
};

const fetchChars = async (
  query,
  { search = '', limit = 500, online = false, offset = 0 }
) => {
  try {
    const total = await query(
      `SELECT COUNT(*) AS ct FROM chars
      LEFT JOIN accounts ON chars.accid = accounts.id
      WHERE chars.deleted IS NULL AND gmlevel = 0 AND charname LIKE ? AND status < 5;`,
      [`${search}%`]
    );
    const statement = `SELECT *, chars.charid AS charid, chars.accid AS accid, IF(accounts_sessions.charid IS NULL, 0, 1) AS \`isOnline\` FROM chars
            JOIN char_stats ON chars.charid = char_stats.charid
            JOIN char_look ON chars.charid = char_look.charid
            JOIN char_jobs ON chars.charid = char_jobs.charid
            LEFT JOIN accounts_sessions on chars.charid = accounts_sessions.charid
            LEFT JOIN accounts ON chars.accid = accounts.id
            WHERE chars.deleted IS NULL AND gmlevel = 0 AND charname LIKE ? AND status < 5
            HAVING isOnline IN (1,?) ORDER BY chars.charname ASC LIMIT ? OFFSET ?;`;
    const results = await query(statement, [
      `${search}%`,
      online ? 1 : 0,
      limit,
      offset,
    ]);
    return {
      total: total[0].ct,
      chars: results.map(char => ({
        charname: char.charname,
        title: titles[char.title],
        jobString: formatJobString(char),
        avatar: formatAvatar(char),
      })),
    };
  } catch (error) {
    console.error('Error while fetching characters', error);
    return { total: 0, chars: [] };
  }
};

module.exports = {
  titleIdToString,
  formatJobString,
  formatAvatar,
  addExtraCharData,
  getCharCrafts,
  getCharAH,
  getCharBazaar,
  getCharEquip,
  getCharData,
  fetchChars,
  skillIdToCraft,
  jobIdToString,
};
