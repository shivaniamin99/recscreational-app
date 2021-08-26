var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Data = require('../schema/Data');

const dbRoute = 'mongodb+srv://dbUser:dbUserPassword@cluster0.2q13w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbRoute, { useUnifiedTopology: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let id = 0;

/* GET home page (The entire database). */
router.get('/', function (req, res, next) {
  console.log('MY GET', req.body);
  Data.find(function (err, data) {
    if (err) { return res.json({ success: false, error: err }) };
    return res.json({ success: true, info: data });
  })
});

/* POST request (Enter a specific entry). */
router.post('/post', function (req, res, next) {
  console.log('MY POST', req.body);

  let addItem = new Data();
  addItem.id = id;
  addItem.item = req.body.item;
  addItem.type = req.body.type;
  addItem.button = req.body.button;
  id++;

  addItem.save((err, data) => {
    if (err) { return res.json({ success: false, error: err }); };
    return res.json({ success: true, info: data });
  })
})

/* DELETE request (Remove an entry). */
router.delete('/delete', function (req, res, next) {
  console.log('MY DELETE', { item: req.body });
  Data.findOneAndDelete({ item: req.body.item }, (err, data) => {
    if (err) { return res.json({ success: false, error: err }); }
    return res.json({ sucess: true, info: data });
  });
})

/* GET request (Search for a specific entry). */
router.post('/find', function (req, res, next) {
  console.log('MY FIND', { item: req.body });
  Data.exists({ item: req.body.item }, (err, data) => {
    if (err) { return res.json({ success: false, error: err }); }
    return res.json({ success: true, info: data });
  })
})

router.delete('/clear', function (req, res, next) {
  console.log('MY CLEAR');
  Data.remove({}, (err, data) => {
    if (err) { return res.json({ success: false, error: err }); }
    return res.json({ success: true, info: data });
  });
})

/* PUT request (Update an entry). */
router.put('/update', function (req, res, next) {
  console.log('MY PUT', { item: req.body.item });
  Data.findOneAndReplace({ item: req.body.item }, (err, data) => {
    if (err) { return res.json({ success: false, error: err }); }
    return res.json({ success: true, info: data });
  })
})

module.exports = router;
