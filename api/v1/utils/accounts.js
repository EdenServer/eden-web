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
    const privilege = Math.pow(2, i);
    if ((mask & privilege) === privilege) {
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
        privileges: getPrivileges(priv),
      };
      return jwt.sign(token, process.env.JWT_SECRET, {
        algorithm: 'HS512',
        expiresIn: '30h',
      });
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
