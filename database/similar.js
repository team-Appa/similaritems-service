const db = require('./postgres.js');
const Sequelize = require('sequelize');

const similar = db.sequelize.define('similar', {
  name: {
    type: Sequelize.STRING
},
  guitarimage: {
    type: Sequelize.STRING
  },
  ratings: {
    type: Sequelize.INTEGER
},
  reviewcount: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.STRING
},
  condition: {
    type: Sequelize.STRING
  },
  itemNum: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
},  {
  timestamps: false
})

module.exports = similar;