var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const conn = require("./database/database");
var fs = require('fs');
var path = require('path');
const ejs = require("ejs");
const port = process.env.PORT || 4000;
//require('dotenv/config');
const ImageSchema = require("./models/models");
const uploads = require("./middleware/multer");
const { reset } = require('nodemon');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine 
app.set("view engine", "ejs");


//this is for the imageupload
// Step 8 - the POST handler for processing the uploaded file

app.post('/', uploads.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	ImageSchema.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});

app.get("/uploadimage",(req,res)=>{
    res.render("form");
})

app.get('/', (req, res) => {
    ImageSchema.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
           // res.send(items);
            //console.log(items);

            res.render("AllPosts",{items:items});
        }
    });
});

app.listen(port,()=>{console.log("server is running on the port : 4000")});