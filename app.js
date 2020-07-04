let express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/positivegasms", { useUnifiedTopology: true, useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


let blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	category: String,
	author: String,
	created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req,res){
	res.render("index");
})

app.get("/blogs", function(req,res){
	Blog.find({}, function(err,blogs){
		if(err){
			console.log("Error!");
		}
		else{
			res.render("blogs", {blogs: blogs});
		}
	});
})

app.get("/blogs/new", function(req,res){
	res.render("new");
});

app.post("/blogs", function(req,res){
	Blog.create(req.body.blog, function(err, newBlog){
		res.redirect("/blogs");
	});
});

app.listen(3000,function(){
	console.log("positivegasms server has started!")
});
