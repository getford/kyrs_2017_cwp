"use strict";
const express = require('express');
const config = require('../config');
const router = express.Router();

module.exports = (gotourlService, siteService, authService, config) => {

    router.post('/checkurl', (req, res) => {
        gotourlService.checkURL(req.body)
            .then((result) => res.json({success: "ok, success"}))
            .catch((err) => res.json(err));
    });

    return router;
};

/*
 router.post('/checkurl', (req, res) => {
 gotourlService.checkURL(req.body, config, req.cookies["x-access-token"])
 .then((result) => res.json(result))
 .catch((err) => res.json(err));
 });
 */