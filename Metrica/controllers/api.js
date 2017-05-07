"use strict";
const express = require('express');
const router = express.Router();

module.exports = (authService, siteService, errorService, gotourlService, cacheService, config) => {
    const authController = require('./auth')(authService, siteService, gotourlService, config);
    const siteController = require('./site')(siteService, gotourlService);
    const errorController = require('./error')(errorService);
    const gotourlController = require('./gotourl')(gotourlService, siteService, config);

    router.use('/auth', authController);
    router.use('/site', siteController);
    router.use('/gotourl', gotourlController);

    return router;
};