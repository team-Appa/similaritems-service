const nr = require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = 3002;
const Guitar = require('../database/Model.js');
const Items = require('../database/items.js');
const Similar = require('../database/similar.js');

app.use(bodyParser.json());
app.use (express.static(__dirname + '/../dist'));
app.use(cors());


app.get ('/api/similaritems', (req, res) => {
  Items.findAll({where: {itemNum : req.query.id}})
    .then((result) => {
      var itemsObj = result[0].dataValues;
      var arr = [];
      var num = 1;
        Similar.findAll({where: {"itemNum": itemsObj['item' + num]}})
          .then((result) => {
            arr.push(result[0].dataValues)
            return num + 1;
          })
          .then((newNum) => {
            Similar.findAll({where: {"itemNum": itemsObj['item' + newNum]}})
            .then((result) => {
              arr.push(result[0].dataValues)
            })
            return newNum + 1;
          })
          .then((newNum) => {
            Similar.findAll({where: {"itemNum": itemsObj['item' + newNum]}})
            .then((result) => {
              arr.push(result[0].dataValues)
            })
            return newNum + 1;
          })
          .then((newNum) => {
            Similar.findAll({where: {"itemNum": itemsObj['item' + newNum]}})
            .then((result) => {
              arr.push(result[0].dataValues)
            })
            return newNum + 1;
          })
          .then((newNum) => {
            Similar.findAll({where: {"itemNum": itemsObj['item' + newNum]}})
            .then((result) => {
              arr.push(result[0].dataValues)
            })
            return newNum + 1;
          })
          .then((newNum) => {
            Similar.findAll({where: {"itemNum": itemsObj['item' + newNum]}})
            .then((result) => {
              arr.push(result[0].dataValues)
              res.json(arr)
              res.end();
            })
          })
    })
});
//return data by groupID
// app.get ('/api/similaritems', (req, res) => {
//   console.log(req.query.id);
//   var group = req.query.id;
//   Guitar.find({Group: `${group}`}, (err, data) => {
//     if (err) {
//       console.log ('error finding similar items data');
//       res.end()
//     } else {
//       console.log(data[0].SimilarItems)
//       res.json(data[0].SimilarItems);
//     }
//   });
// });

//create new item
app.post ('/api/similaritems', (req, res) => {
  console.log(req.body);
  Guitar.create({
    name: req.body.name,
    guitarImage: req.body.guitarImage,
    Ratings: req.body.Ratings,
    ReviewCount: req.body.ReviewCount,
    Price: req.body.Price,
    Condition: req.body.Condition
  }, function(err) {
    if(err) {
      console.log('error adding data', err)
    } else {
      console.log('successful addition')
    }
  })
  res.send('successful Addition')
  res.end()
});

//update an item
app.put ('/api/similaritems', (req, res) => {
  console.log(req.query.id);
  var group = req.query.id;
  Guitar.updateOne({Group: group}, {Price: req.body.Price}, function(err, response) {
    if (err) {
      console.log('error updating', err)
      res.end()
    } else {
      console.log('success updating', response)
      res.end()
    }
  })
});

//delete an item
app.delete ('/api/similaritems', (req, res) => {
  console.log(req.query.id);
  var group = req.query.id;
  Guitar.deleteOne({Group: group}, (err) => {
    if (err) {
      console.log('error deleting', err)
      res.end()
    } else {
      console.log('success deleting')
      res.end()
    }
  })
});




let server;
const start = () => (server = app.listen (port, function() {
  console.log(`listening on port ${port}`);
})
);
start();

const close = server ? server.close : () => {};


module.exports = app;
module.exports.start = start;
module.exports.close = close;
