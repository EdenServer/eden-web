import 'lightenv';
import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import Cache from './api/v1/utils/cache';
import Pattern from './api/v1/utils/pattern';
import preparedStatement from './api/v1/utils/db';
import { loadItems, refreshOwnersCache } from './api/v1/utils/items';
import { refreshTitleCache } from './api/v1/utils/chars';
import api from './api';
import rateLimit from 'express-rate-limit';

const port = process.env.PORT || 8081;
const app = express();

const limiter = rateLimit({
  windowMs: 10000, // 10 seconds
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.set('trust proxy', 1);
app.get('/ip', (request, response) => response.send(request.ip));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.locals.cache = new Cache({ interval: 120000 }); // 2 minutes
app.locals.pattern = new Pattern();
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

    // Create the MySQL 5.x PASSWORD function if needed
    app.locals.db.execute(
      "CREATE FUNCTION IF NOT EXISTS PASSWORD (password CHAR(50)) RETURNS CHAR(50) RETURN CONCAT('*', UPPER(SHA1(UNHEX(SHA1(password)))));"
    );

    // Setup cached results and refreshing of them
    await refreshOwnersCache(app.locals.query);
    setInterval(
      async () => await refreshOwnersCache(app.locals.query),
      86400000 // Once every day
    );

    await refreshTitleCache(app.locals.query);
    setInterval(
      async () => await refreshTitleCache(app.locals.query),
      14400000 // Once every 4 hours
    );

    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
})();
