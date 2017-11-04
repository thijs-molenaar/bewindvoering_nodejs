var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var app = Express();
app.use(bodyParser.json());

// serve js as static files
app.use("/js", Express.static(path.resolve(__dirname + "/../dist/js")));

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "/../dist/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count

app.get("/", function(req, res) {
     res.sendFile( path.resolve(__dirname + "/../dist/index.html"));
     //res.redirect('index.html');
 });

 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });

 app.listen(8080, () => console.log('Listening on port 8080'))
