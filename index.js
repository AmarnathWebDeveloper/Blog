import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let postData = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/upload", (req, res) => {
  res.render("post.ejs");
});
app.post("/submitPost", (req, res) => {
  postData.push(req.body);
  console.log(postData);
  res.render("homePost.ejs", {
    data: postData,
  });
  const i = postData.length - 1;
  const routeHandlePrev = "/preview" + i;
  app.get(routeHandlePrev, (req, res) => {
    res.render("preview.ejs", {
      previewData: postData[i],
      i:i
    });
  });
  const routeHandleDelete = "/delete" + i;
  app.get(routeHandleDelete, (req, res) => {
    postData.splice(i, 1);
    res.render("homePost.ejs", {
      data: postData,
    });
  });
  const routeHandleEdit = "/edit" + i;
  app.get(routeHandleEdit, (req, res) => {
    res.render("edit.ejs", {
      editData: postData[i],
      Index: i,
    });
  });
  app.post("/editPostData", (req, res) => {
    postData[req.body.index] = req.body;
    res.render("homePost.ejs", { data: postData });
  });
  app.get("/back",(req,res)=>{
    res.render("homePost.ejs", { data: postData });
  })
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
