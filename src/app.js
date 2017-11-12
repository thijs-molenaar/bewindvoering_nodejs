var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var mime = require('mime-types')
var app = Express();
app.use(bodyParser.json());

var dbhelper = require('./dbhelper.js');

// serve js as static files
app.use("/js", Express.static(path.resolve(__dirname + "/../dist/js")));

// serve uploaded files as static files
app.use("/uploads", Express.static(path.resolve(__dirname + "/../dist/uploads")));

var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname + "/../dist/uploads"));
    },
    filename: (req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname + "." + extension);
    }
});

var uploadUserImage = multer({
   storage: Storage
}).single("imgUploader");

app.post("/api/upload/user/image", (req, res) => {
  uploadUserImage(req, res, (err) => {
     if (err) {
       console.log(err);
       return res.end(JSON.stringify({"result":"error"}));
     }
     console.log(req.file);
     res.write(JSON.stringify({"result":"success", "file": req.file}));
     return res.end();
  });
});

function connectToMongo(){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/bewindvoering";

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database accessed!");
    db.listCollections().toArray( (err, collInfos) => {
    // collInfos is an array of collection info objects that look like:
    // { name: 'test', options: {} }
    console.log(collInfos);
    });
    db.collection("people").find().toArray( (err, people) => {
      if (err) throw err;
      people.forEach( (person) => {
        console.log(person.firstname);
      });
    });
    db.close();
  });
}

app.get("/", (req, res) => {
   res.sendFile( path.resolve(__dirname + "/../dist/index.html"));
   //connectToMongo();
   //res.redirect('index.html');
});

app.get("/test", (req, res) => {

// to use await we need to be inside an async function
(async () => {
  let people = await dbhelper.getUsers();
  console.log(await people);
  res.write(await people[0].firstname);
  res.end();
})();

// another way is to use a promise
// dbhelper.retrieveUsers().then( (people) => {
//   console.log(people);
// });

});

app.get("/users", (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/bewindvoering";

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection("people").find().toArray( (err, people) => {
      if (err) throw err;
      people.forEach( (person) => {
        res.write(person.firstname);
      });
      res.end();
    });
    db.close();
  });
});

app.get("/create_user", (req, res) => {
   res.sendFile( path.resolve(__dirname + "/../dist/create_user.html"));
});

app.listen(8080, () => console.log('Listening on port 8080'));
