const express=require("express")
const app=express();
const port=3000;
const path=require("path");
const {v4:uuidv4}= require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
uuidv4();
//to parse the middlewares
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[{
    id:uuidv4(),
    username:"apnacollege",
    content:"i lve coding"
},
    { id:uuidv4(),
    username:"apnacollege",
    content:"i love coding"
},
{ id:uuidv4(),
username:"apnacollege",
    content:"i love coding"
},
];
//rendering and sending post(data to templat taaki koi kaam karna ho)
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/",(req,res)=>{
    res.send("serving wok well")
})

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id ,username,content});
    console.log(req.body);
    // res.send("received");
    res.redirect("/posts");//goes to index waaali jagah.apne aap hi index waala page khul jaeyga
})
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id==p.id);
  if(!post) return res.send("post not found");
//   console.log(post);
//render show.ejs
  res.render("show.ejs",{post})
//   res.send("request working well")
})
//update route
/*app.patch("/posts/:id",(req,res)=>{
    //id ko deconstruct karwa ke print kar diya and newcontent add kar doya uss corresponding post ki content pe
    let {id}=req.params;
    let newContent=req.body.content;
    //abb vo post dhundh li jisme hume e content change karna hai
    let post=posts.find((p)=>{
        return id==p.id;
    })
    post.content=newContent;
    console.log(post);
    
    res.send("patch request working")
})*/
app.patch("/posts/:id", (req, res) => {
    // Destructuring id from req.params and extracting new content from req.body
    let { id } = req.params;
    let newContent = req.body.content;

    // Finding the post with the given id
    let post = posts.find((p) => {
        return id == p.id;
    });

    // Check if the post exists before trying to set its content
    if (post) {
        post.content = newContent;
        console.log(post);
        // res.send("Patch request working");
    } else {
        res.send("Post not found");
    }
    //last mai redirest
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    if(!post) return res.send("post not found");
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
    posts =posts.filter((p)=>id!==p.id);
    //  res.send("delete success");
     res.redirect("/posts");//goes to index waaali jagah.apne aap hi index waala page khul jaeyga
})
app.listen(port,()=>{
    console.log(`port :${port}`);
})