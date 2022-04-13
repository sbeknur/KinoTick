const express = require("express");
const app = express();
const port = 3000;

app.get('/',((req, res) => {
    res.sendFile(__dirname+'/index.html')
}))

app.get('/about',((req, res) => {
    res.sendFile(__dirname+'/about.html')
}))

app.get('/home',((req, res) => {
    res.sendFile(__dirname+'/home.html')
}))

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);