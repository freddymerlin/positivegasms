let express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	ejs = require("ejs"),
	moment = require('moment'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost:27017/database_positivegasms", { useUnifiedTopology: true, useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


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
        default: () => moment().format("MMMM Do YYYY")
    }
});

let Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req,res){
	res.render("index");
})

app.get("/blogs", function(req,res){
	var perPage = 5;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
	Blog.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allBlogs) {
        Blog.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("blogs", {
                    blogs: allBlogs,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
})


app.get("/blogs/:category", function(req,res){
	var perPage = 5;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
	Blog.find({ category: req.params.category }).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allBlogs) {
        Blog.count({ category: req.params.category }).exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("blogs", {
                    blogs: allBlogs,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
})

app.get("/blogs/new", function(req,res){
	res.render("new");
});

app.post("/blogs", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
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
	req.body.blog.body = req.sanitize(req.body.blog.body);
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
