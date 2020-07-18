const db = require('./postgres.js');
const Sequelize = require('sequelize');

const items = db.sequelize.define('items', {
  item1: {
    type: Sequelize.INTEGER
},
  item2: {
    type: Sequelize.INTEGER
  },
  item3: {
    type: Sequelize.INTEGER
},
  item4: {
    type: Sequelize.INTEGER
  },
  item5: {
    type: Sequelize.INTEGER
},
  item6: {
    type: Sequelize.INTEGER
  },
  itemNum: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
},  {
  timestamps: false
})

module.exports = items;
