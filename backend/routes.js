const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Basic Examples
router.post('/insertOne', async (req, res) => {
  const result = await User.create(req.body);
  res.send(result);
});

router.post('/insertMany', async (req, res) => {
  const result = await User.insertMany(req.body);
  res.send(result);
});

router.get('/find', async (req, res) => {
  const result = await User.find(req.query);
  res.send(result);
});

router.get('/findOne', async (req, res) => {
  const result = await User.findOne(req.query);
  res.send(result);
});

router.get('/findLimit', async (req, res) => {
  const result = await User.find().limit(5);
  res.send(result);
});

router.get('/findSkip', async (req, res) => {
  const result = await User.find().skip(10);
  res.send(result);
});

router.get('/findSort', async (req, res) => {
  const result = await User.find().sort({ age: -1 });
  res.send(result);
});

router.get('/distinctCities', async (req, res) => {
  const result = await User.distinct('city');
  res.send(result);
});

router.get('/countDocs', async (req, res) => {
  const result = await User.countDocuments({ active: true });
  res.send({ count: result });
});

// Update/Delete/Replace
router.patch('/updateOne', async (req, res) => {
  const result = await User.updateOne(req.query, req.body);
  res.send(result);
});

router.patch('/updateMany', async (req, res) => {
  const result = await User.updateMany(req.query, req.body);
  res.send(result);
});

router.put('/replaceOne', async (req, res) => {
  const result = await User.replaceOne(req.query, req.body);
  res.send(result);
});

router.delete('/deleteOne', async (req, res) => {
  const result = await User.deleteOne(req.query);
  res.send(result);
});

router.delete('/deleteMany', async (req, res) => {
  const result = await User.deleteMany(req.query);
  res.send(result);
});

router.post('/aggregate', async (req, res) => {
  const result = await User.aggregate(req.body);
  res.send(result);
});

router.post('/createIndex', async (req, res) => {
  const result = await User.collection.createIndex(req.body.field, req.body.options);
  res.send(result);
});

router.post('/dropIndex', async (req, res) => {
  const result = await User.collection.dropIndex(req.body.name);
  res.send(result);
});

router.get('/getIndexes', async (req, res) => {
  const result = await User.collection.getIndexes();
  res.send(result);
});

router.patch('/findOneAndUpdate', async (req, res) => {
  const result = await User.findOneAndUpdate(req.query, req.body, { new: true });
  res.send(result);
});

router.delete('/findOneAndDelete', async (req, res) => {
  const result = await User.findOneAndDelete(req.query);
  res.send(result);
});

router.post('/bulkWrite', async (req, res) => {
  const result = await User.bulkWrite(req.body);
  res.send(result);
});

router.put('/findOneAndReplace', async (req, res) => {
  const result = await User.findOneAndReplace(req.query, req.body);
  res.send(result);
});

router.post('/renameCollection', async (req, res) => {
  const result = await User.collection.rename(req.body.newName);
  res.send(result);
});

router.delete('/dropCollection', async (req, res) => {
  const result = await User.collection.drop();
  res.send(result);
});

router.get('/listCollections', async (req, res) => {
  const collections = await User.db.db.listCollections().toArray();
  res.send(collections);
});

module.exports = router;
