const faker = require('faker');
const JSONToCSV = require('json2csv');
const fs = require('fs');

const writeSimilarItems = fs.createWriteStream('similaritems.csv');
writeSimilarItems.write('name,guitarImage,Ratings,ReviewCount,Price,Condition,itemNum\n', 'utf8');

const writeItems = fs.createWriteStream('data.csv');
writeItems.write('item1,item2,item3,item4,item5,item6, itemNum\n', 'utf8');


var imageGenerator = function() {
  var randomize = Math.floor(Math.random() * 1000);
  var URL = 'https://picsum.photos/id/' + randomize + '/200/300';
  return URL;
};

var conditionGenerator = function() {
  var condition = Math.floor(Math.random() * 1);
  if (condition === 0) {
    return 'New';
  } else {
    return 'Used';
  }
};

var count = 1;

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeOneHundredThousandSimilarItems(writer, encoding, callback) {
  let i = 100000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const name = faker.company.companyName() + faker.commerce.productAdjective() + faker.commerce.productName() + faker.commerce.color();
      const guitarImage = imageGenerator();
      const Ratings = Math.floor(Math.random() * 5);
      const ReviewCount = Math.floor(Math.random() * 500);
      const Price = '$' + faker.commerce.price();
      const Condition = conditionGenerator();
      const itemNum = count;
      const data = `${name},${guitarImage},${Ratings},${ReviewCount},${Price},${Condition},${itemNum}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
        count++
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
        count++
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeOneHundredThousandSimilarItems(writeSimilarItems, 'utf-8', () => {
  writeSimilarItems.end();
});


//============================================================================================================

function writeTenMillionItems(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const item1 = Math.floor((Math.random() * 100000) + 1);
      const item2 = Math.floor((Math.random() * 100000) + 1);
      const item3 = Math.floor((Math.random() * 100000) + 1);
      const item4 = Math.floor((Math.random() * 100000) + 1);
      const item5 = Math.floor((Math.random() * 100000) + 1);
      const item6 = Math.floor((Math.random() * 100000) + 1);
      const itemNum = id;
      const data = `${item1},${item2},${item3},${item4},${item5},${item6}, ${itemNum}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
        count++
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
        count++
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeTenMillionItems(writeItems, 'utf-8', () => {
  writeItems.end(console.log("write is complete"));
});