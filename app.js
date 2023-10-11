//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var posts = [];
const app = express();
var Lodash = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home", { homecontent1: homeStartingContent, newblog: posts });
  console.log(posts[posts.length - 1]);
});
app.get("/posts/:post1", (req, res) => {
  var parameter = Lodash.lowerCase(req.params.post1);
  posts.forEach(function (post) {
    var check = Lodash.lowerCase(post.title);
    if (check == parameter) {
      res.render("post", { heading: post.title, postcontent: post.post });
    }
  });
}
);
app.get("/about", (req, res) => {
  res.render("about", { aboutcontent1: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactcontent1: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose", { error: "" });
});
// app.post("/compose", (req, res) => {
//   var blog = { title: req.body.newblog, post: req.body.postbody };
//   posts.push(blog);
//   res.redirect("/");
// });
app.post("/compose", (req, res) => {
  const newTitle = req.body.newblog;
  const newPost = req.body.postbody;

  // Check if either the title or post body is empty
  if (!newTitle || !newPost) {
    return res.render("compose", { error: "Both the title and post body must be filled in." });
  }

  // Check if the post title is the same as an existing post's title
  const duplicatePost = posts.find(post => post.title === newTitle);
  if (duplicatePost) {
    return res.render("compose", { error: "A post with the same title already exists." });
  }

  // If all checks pass, add the new blog to the posts array
  const blog = { title: newTitle, post: newPost };
  posts.push(blog);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
