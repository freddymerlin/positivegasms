let express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	ejs = require("ejs"),
	moment = require('moment'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer');

//process.env.VER


//mongoose.connect("mongodb://localhost:27017/database_positivegasms", { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connect(process.env.DATABASEurl, { useUnifiedTopology: true, useNewUrlParser: true } );
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



let foodCount = 0;
let lifestyleCount = 0;
let entertainmentCount = 0;
let healthCount = 0;
let travelCount = 0;
let superheroesCount = 0;

Blog.find({}).exec(function (err, allBlogs){
	
	allBlogs.forEach(function(blogs){
		
		if(blogs.category == "food"){foodCount++;}
		if(blogs.category == "lifestyle"){lifestyleCount++;}
		if(blogs.category == "entertainment"){entertainmentCount++;}
		if(blogs.category == "health"){healthCount++;}
		if(blogs.category == "travel"){travelCount++;}
		if(blogs.category == "superheroes"){superheroesCount++;}
	})
	
});


app.get("/", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Error!");
		}
		else{
			res.render("index", 
					   {blogs:blogs,
						mainblogs:blogs,
						superheroesCount: superheroesCount,
						travelCount: travelCount,
						foodCount: foodCount,
						healthCount: healthCount,
						lifestyleCount: lifestyleCount,
						entertainmentCount: entertainmentCount});
		}
	})
})

app.get("/thankyou", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Error!");
		}
		else{
			res.render("thankyou", 
					   {mainblogs:blogs});
		}
	})
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
				Blog.find({}, function(err, mainblogs){
						res.render("blogs", {
						blogs: allBlogs,
						mainblogs: mainblogs,
						current: pageNumber,
						pages: Math.ceil(count / perPage)
                	});
				});
                
            }
        });
    });
})


app.get("/blogs/sorted/:category", function(req,res){
	var perPage = 5;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
	Blog.find({ category: req.params.category }).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allBlogs) {
        Blog.count({ category: req.params.category }).exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
				Blog.find({}, function(err, mainblogs){
					res.render("categories", {
						blogs: allBlogs,
						mainblogs: mainblogs,
						category_name: req.params.category,
						current: pageNumber,
						pages: Math.ceil(count / perPage)
					});
				});
                
            }
        });
    });
})

app.get("/blogs/new", function(req,res){
	Blog.find({}, function(err, blogs){
		res.render("new", {mainblogs:blogs, password: process.env.NUM});
	});
	
});

app.post("/blogs", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		res.redirect("/blogs");
	});
});

app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		Blog.find({}, function(err, blogs){
			res.render("show",{blog:foundBlog,mainblogs:blogs});
		});
	});
	
});

app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		Blog.find({}, function(err, blogs){
			res.render("edit",{blog:foundBlog, mainblogs:blogs});
		});
		
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

app.listen(process.env.PORT ||3000,function(){
	console.log("positivegasms server has started!")
});
