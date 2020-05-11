require('lightenv');
const express = require('express');

/**
 * Spins up a server that can act as if it was the game server, which can then be checked/queried to see if it's online.
 * This is used to simulate that "Eden is online", so the corresponding online information will be shown on the site.
 */
const port = process.env.GAME_SERVER_PORT || 54321;
const app = express();

app.get('/*', (req, res) => {
    res.status(200);
    res.send("OK");
});

(async () => {
    try {
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.error(error);
    }
})();
