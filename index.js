import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/' })
const __dirname = dirname(fileURLToPath(import.meta.url));
const posts = [];
const toRender = [] 
const app = express();
const port = 3000;
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("main.ejs")
});

app.get('/create', (req, res) => {
    res.render("create.ejs")
})

app.get("/notes", (req, res) => {
    res.render("notes.ejs", {
        posts: toRender
    })
    toRender = [];
})

app.post('/create',upload.single('image'),(req,res)=>{
    const { title, description } = req.body;
    const path = __dirname + "/public/uploads/" + req.file.filename
    posts.push({ title: req.body.title, description: req.body.description, photo: path });
    toRender.push({ title: req.body.title, description: req.body.description, photo: "uploads/" +  req.file.filename });
    res.render("create.ejs")
    console.log(posts)
})




app.listen(3000, () => {
    console.log(`Server running on port:${port}`)
});