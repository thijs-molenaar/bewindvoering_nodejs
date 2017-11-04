var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var app = Express();
app.use(bodyParser.json());

// serve js as static files
app.use("/js", Express.static(path.resolve(__dirname + "/../dist/js")));

var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname + "/../dist/uploads"));
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
   storage: Storage
}).array("imgUploader", 3); //Field name and max count

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
   connectToMongo();
   //res.redirect('index.html');
});

app.get("/create_user", (req, res) => {
   res.sendFile( path.resolve(__dirname + "/../dist/create_user.html"));
});

app.post("/api/Upload", (req, res) => {
  upload(req, res, (err) => {
     if (err) {
       console.log(err);
       return res.end("Something went wrong!");
     }
     return res.end("File uploaded sucessfully.");
  });
});

app.listen(8080, () => console.log('Listening on port 8080'));
