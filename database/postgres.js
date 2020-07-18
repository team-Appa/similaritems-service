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

sequelize.sync()

module.exports = {sequelize};