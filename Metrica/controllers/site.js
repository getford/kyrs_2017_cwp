"use strict";
const express = require('express');
const config = require('../config');
const router = express.Router();

module.exports = (siteService, gotourlService) => {

    router.post('/addsite', (req, res) => {
        siteService.addSite(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json({success: "site was added"}))
            .catch((err) => res.json(err));
    });

    router.delete('/delsite', (req, res) => {
        siteService.delSite(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json({success: "site was deleted"}))
            .catch((err) => res.json(err));
    });

    router.get('/mysites', (req, res) => {
        siteService.mySites(req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    return router;
};

