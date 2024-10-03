import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from 'multer';
const __dirname = dirname(fileURLToPath(import.meta.url));
const posts = [];
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
    res.render("notes.ejs")
})

app.post("/create", (req, res) => {
    const { title, description } = req.body;
    console.log(req.body.file)
    posts.push({ title, description });
    res.redirect("/notes")

})



app.listen(3000, () => {
    console.log(`Server running on port:${port}`)
});