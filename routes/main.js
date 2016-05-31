// Routes for /
/**
 * Module dependencies
 */
const express = require('express');

// Init router
const router = express();

/** GET / */
router.get('/', (req, res, next) => {
    res.render('index.ejs');
});

// Export
module.exports = router;