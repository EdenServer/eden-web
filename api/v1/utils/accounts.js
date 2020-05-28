const jwt = require("jsonwebtoken");

const getJWTForAccountId = async (query, accid) => {
  try {
    const statement = "SELECT * FROM accounts WHERE `id` = ?;";
    const results = await query(statement, [accid]);
    if (results.length === 1) {
      const { id, login, email, timecreate, timelastmodify } = results[0];
      const token = {
        id,
        login,
        email,
        timecreate,
        timelastmodify,
        iss: "https://edenxi.com",
      };
      return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: "1h" });
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
