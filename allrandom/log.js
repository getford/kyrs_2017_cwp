let winston = require('winston');

function getLogger(module) {
    //отобразим метку с именем файла, который выводит сообщение
    let path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path
            })
        ]
    });
}

module.exports = getLogger;