"use strict";
const express = require('express');
const config = require('../config');
const router = express.Router();

module.exports = (clickService, siteService, authService, config) => {

    router.post('/catchclicks', (req, res) => {
        clickService.catchClicks(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    return router;
};