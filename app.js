const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,";
const aboutContent = "Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede";
const contactContent = "Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas ";
const app = express();

let posts = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
   res.render("home",{
       homecontent:homeStartingContent,
       posts:posts
    });
   
   
});

app.get("/about", function(req, res){
    res.render("about",{aboutcontent:aboutContent});
 });

 app.get("/contact", function(req, res){
    res.render("contact",{contactcontent:contactContent});
 });

 app.get("/compose", function(req, res){
    res.render("compose");
 });

app.post("/compose", function(req, res){
   const post = {
       title: req.body.postTitle,
       content:req.body.postBody
   }; 

   posts.push(post); 
   res.redirect('/');
});

app.get('/posts/:topic', function(req, res){
   const parameter = _.lowerCase(req.params.topic);
   posts.forEach(function(post){
       const storedTitle = _.lowerCase(post.title);

       if(storedTitle === parameter){
           res.render("post", {
               titlepost:post.title,
               contentpost:post.content
            });
          
       }
   });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});