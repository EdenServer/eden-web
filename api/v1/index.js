const { Router } = require('express');

const router = Router();

const accounts = require('./accounts');
const chars = require('./chars');
const items = require('./items');
const misc = require('./misc');

router.use('/accounts', accounts);
router.use('/chars', chars);
router.use('/items', items);
router.use('/misc', misc);

module.exports = router;
