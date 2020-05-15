import 'lightenv';
import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import Cache from './api/v1/utils/cache';
import preparedStatement from './api/v1/utils/db';
import { loadItemKeys, loadItems } from './api/v1/utils/items';
import api from './api';


const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.locals.cache = new Cache({ interval: 120000 }); // 2 minutes
app.locals.db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDB,
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
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
