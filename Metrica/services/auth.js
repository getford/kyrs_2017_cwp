"use strict";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Promise = require("bluebird");
const saltRounds = 10;

module.exports = (userRepository, siteRepository, gotourlRepository, errors) => {
    return {login: login, register: register, accinfo: accinfo};

    function login(data) {
        return new Promise((resolve, reject) => {
            userRepository.findOne({
                where: {login: data.login},
                attributes: ['id', 'login', 'password']
            })
                .then((user) => {
                    if (user === "")
                        return reject(errors.unauthorized);
                    else {
                        bcrypt.compare(data.password.toString(), user.password.toString(),
                            (err, result) => {
                                if (result === true)
                                    resolve(user.id);
                                else
                                    return reject(errors.unauthorized);
                            });
                    }
                })
                .catch(() => reject(errors.unauthorized));
        });
    }

    function register(data) {
        return new Promise((resolve, reject) => {
            userRepository.count({where: [{login: data.login}]})
                .then((count) => {
                    if (count > 0)
                        return reject({"error": "login in db"});
                    else {
                        if (data.login.length < 4 || data.password.length < 4)
                            return reject(errors.badRequest);
                        else {
                            return new Promise((resolve, reject) => {
                                bcrypt.hash(data.password.toString(), saltRounds, (err, hash) => {
                                    if (err)
                                        return reject(err);
                                    else {
                                        userRepository.create({
                                            login: data.login,
                                            password: hash
                                        });
                                        return resolve({success: "user registered"});
                                    }
                                });
                            });
                        }
                    }
                })
                .then((data) => resolve({success: "user registered"}))
                .catch(() => reject(errors.internalServerError));
        });
    }

    function accinfo(config, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    return reject(err);
                else {
                    userRepository.find({
                        where: {login: decode.__user_login},
                        attributes: ['login'],
                        include: {
                            model: siteRepository,
                            where: {authId: decode.__user_id},
                            attributes: ['url'],
                            include: {
                                model: gotourlRepository,
                                attributes: ['url', 'count', 'date']
                            }
                        },
                    })
                        .then((result) => {
                            if (result === null)
                                resolve({success: "User don't have sites"});
                            else
                                resolve(result);
                        })
                        .catch(() => reject(errors.internalServerError));
                }
            });
        });
    }
};