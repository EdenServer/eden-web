const jwt = require('jsonwebtoken');

const privileges = [
  'PLAYER', // 1
  'UNUSED1', // 2
  'UNUSED2', // 4
  'UNUSED3', // 8
  'UNUSED4', // 16
  'UNUSED5', // 32
  'UNUSED6', // 64
  'UNUSED7', // 128
];

const getPrivileges = mask => {
  const userPrivileges = [];
  for (let i = 0; i < 8; i++) {
    if ((mask & Math.pow(2, i)) === mask) {
      userPrivileges.push(privileges[i]);
    }
  }

  return userPrivileges;
};

const getJWTForAccountId = async (query, accid) => {
  try {
    const statement = 'SELECT * FROM accounts WHERE `id` = ?;';
    const results = await query(statement, [accid]);
    if (results.length === 1) {
      const { id, login, email, priv, timecreate, timelastmodify } = results[0];
      const token = {
        id,
        login,
        email,
        timecreate,
        timelastmodify,
        iss: 'https://edenxi.com',
        privileges: getPrivileges(priv),
      };
      return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: '1h' });
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getJWTForAccountId,
};
