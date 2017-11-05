"use strict";

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/bewindvoering";

exports.getUsers = async () => {
  let db;
  try {
    db = await MongoClient.connect(url);
  } catch (err) {
    console.log(err);
  }

  let people;
  try {
    people = await db.collection("people").find().toArray();
  } catch (err) {
    console.log(err);
  }

  db.close();
  return await people;

}
