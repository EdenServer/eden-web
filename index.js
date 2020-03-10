require('lightenv');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const api = require('./api');
const { loadItems, loadItemKeys } = require('./api/v1/utils/items');
const Cache = require('./api/v1/utils/cache');
const preparedStatement = require('./api/v1/utils/db');

const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'client/build')));

app.use('/api', api);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.locals.cache = new Cache({ interval: 120000 }); // 2 minutes
app.locals.db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDB,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
});
app.locals.query = preparedStatement(app.locals.db);

(async () => {
    try {
        app.locals.items = await loadItems(app.locals.query);
        app.locals.itemKeys = await loadItemKeys(app.locals.query);
        // eslint-disable-next-line no-console
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
})();
