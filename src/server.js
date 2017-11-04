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

app.get("/", (req, res) => {
   res.sendFile( path.resolve(__dirname + "/../dist/index.html"));
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
