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

    router.post('/sumfordayclick', (req, res) => {
        clickService.sumForDayClick(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/getclicksalldate', (req, res) => {
        clickService.getClicksAllDate(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/getclicksthisday', (req, res) => {
        clickService.getClicksThisDay(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/getclickdonutsalldate', (req, res) => {
        clickService.getClicksDonutAllDate(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/getclicksdonutthisday', (req, res) => {
        clickService.getClicksDonutThisDate(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    return router;
};

