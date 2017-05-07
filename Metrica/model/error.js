module.exports = (Sequelize, sequelize) => {
    return sequelize.define('error', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: Sequelize.INTEGER,
        url: Sequelize.STRING,
        text: Sequelize.STRING,
        count: Sequelize.INTEGER
    });
};