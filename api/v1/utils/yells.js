const autotranslate = require('./autotranslate');
const lists = require('../lists');

const hexToAscii = str => {
  let hexString = str;
  let strOut = '';
  for (let x = 0; x < hexString.length; x += 2) {
    strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
  }
  return strOut;
};

const hexMap = {
  '0': '30',
  '1': '31',
  '2': '32',
  '3': '33',
  '4': '34',
  '5': '35',
  '6': '36',
  '7': '37',
  '8': '38',
  '9': '39',
  A: '41',
  B: '42',
  C: '43',
  D: '44',
  E: '45',
  F: '46',
};

const subAT = key => {
  const lookup = autotranslate[key];

  if (!lookup) {
    return `7B7B${key
      .split('')
      .map(s => hexMap[s])
      .join('')}7D7D`;
  } else {
    return `7B${lookup}7D`;
  }
};

const parseMessage = (message, items) => {
  const parsedText = message.replace(/FD[0-9A-F]{8}FD/g, str => subAT(str.substr(2, 8)));
  const englishText = hexToAscii(parsedText);
  const after = englishText.replace(/{{[0-9A-F]{8}}}/g, str => {
    const itemid = str.substr(6, 4);
    const item = items[parseInt(itemid, 16)];
    if (item) {
      return `{${item.name.replace(/_/g, ' ')}}`;
    } else {
      return `{{${str.substr(2, 8)}}}`;
    }
  });
  const val1 = after.replace(/\{/g, '«');
  return val1.replace(/\}/g, '»');
};

const getYells = async query => {
  try {
    const limit = parseInt(process.env.MAX_YELLS_DISPLAYED ?? 30, 10);
    const statement = `SELECT speaker, message, unix_timestamp(datetime) AS date
            FROM audit_chat WHERE type = "YELL"
            ORDER BY lineID DESC${limit === 0 ? ';' : ' LIMIT ?;'}`;
    const results = await query(statement, limit === 0 ? undefined : [limit]);
    return results.map(row => ({
      date: row.date * 1000,
      speaker: row.speaker,
      message: parseMessage(row.message.toString('hex').toUpperCase(), lists.items),
    }));
  } catch (error) {
    console.error('Error while getting yells', error);
    return [];
  }
};

module.exports = { getYells };
