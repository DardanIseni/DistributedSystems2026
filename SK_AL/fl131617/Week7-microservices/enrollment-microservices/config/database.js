const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ({
    dialect:'sqlite',
    storage:'./enrollment.sqlite',
    logging: false
})

module.exports = sequelize