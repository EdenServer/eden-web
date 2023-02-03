const { Router } = require('express');

const router = Router();

// const accounts = require('./accounts');
const chars = require('./chars');
const items = require('./items');
const misc = require('./misc');
const guilds = require('./guilds');

// router.use('/accounts', accounts);
router.use('/chars', chars);
router.use('/items', items);
router.use('/misc', misc);
router.use('/guilds', guilds);

module.exports = router;
