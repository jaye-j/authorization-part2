const express = require('express');
const router = express.Router();
const auth = require('../auth');


router.get('/protected', auth, (req, res) => {

    res.send('protected')
});

module.exports = router