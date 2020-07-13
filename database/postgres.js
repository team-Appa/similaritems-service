// const similarItems = require('./similaritems.csv');
const fs = require('fs');
//const Items = require('./data.csv');
const path = require('path');
const fastcsv = require('fast-csv');
const pg = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('similaritems', 'postgres', 'Project123!', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
    .then(function(err) {
      console.log('We connected!')
    })
    .catch(function(err) {
      console.log('Unable to connect :(', err)
    })

sequelize.sync({force: true})

const items = sequelize.define('items', {
  item1: {
    type: Sequelize.INTEGER
},
  item2: {
    type: Sequelize.STRING
  },
  item3: {
    type: Sequelize.INTEGER
},
  item4: {
    type: Sequelize.STRING
  },
  item5: {
    type: Sequelize.INTEGER
},
  item6: {
    type: Sequelize.STRING
  },
  itemNum: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
},  {
  timestamps: false
})

const similar = sequelize.define('similar', {
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
