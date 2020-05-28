module.exports = (db) => (statement, values = []) =>
  new Promise(async (resolve, reject) => {
    db.execute(statement, values, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
