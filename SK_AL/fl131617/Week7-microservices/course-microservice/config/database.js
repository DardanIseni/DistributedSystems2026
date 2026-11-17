const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ({
    dialect:'sqlite',
    storage:'./course.sqlite',
    logging: false
})

module.exports = sequelize