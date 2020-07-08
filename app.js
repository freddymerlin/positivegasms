let express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	ejs = require("ejs"),
	moment = require('moment'),
	methodOverride = require('method-override');

mongoose.connect("mongodb://localhost:27017/database_positivegasms", { useUnifiedTopology: true, useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



let blogSchema = new mongoose.Schema({
	title: String,
	description: String,
	image: String,
	image_subtitle:String, 
	body: String,
	category: String,
	author: String,
	author_image: String,
	created: {
        type: String, 
        default: () => moment().format("dddd, MMMM Do YY")
    }
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

app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		res.render("show",{blog:foundBlog});
	});
	
});

app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		res.render("edit",{blog:foundBlog});
	});
	
});

app.put("/blogs/:id", function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		res.redirect("/blogs/"+req.params.id);
	});
});

app.delete("/blogs/:id", function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		res.redirect("/blogs");
	});
});

app.listen(3000,function(){
	console.log("positivegasms server has started!")
});
