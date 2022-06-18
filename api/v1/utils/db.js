module.exports = db => (statement, values = [], measure = true) =>
  new Promise(async (resolve, reject) => {
    const start = Date.now();
    db.execute(statement, values, (error, value) => {
      if (measure) {
        const time = Date.now() - start;
        if (time > 400) {
          console.warn(`Query: ${statement}`);
          console.warn(`Values: ${values}`);
          console.warn(`Query took: ${time}ms`);
        }
      }

      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
