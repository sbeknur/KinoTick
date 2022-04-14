const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const port = 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', ((req, res) => {
    res.sendFile(__dirname + '/index.html')
}))

app.get('/about', ((req, res) => {
    res.sendFile(__dirname + '/about.html')
}))

app.get('/home', ((req, res) => {
    res.sendFile(__dirname + '/home.html')
}))



// async function start() {
//     try {
//         await mongoose.connect('', {
//             useNewUrlParser: true,
//             useFindAndModify: false
//         })
//     app.listen(port, () =>
//     console.log(`App listening at http://localhost:${port}`)
//     );
//     } catch (e) {
//         console.log(e)
//     }
// }

// start()

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);