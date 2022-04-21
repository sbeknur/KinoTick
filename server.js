const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


const port = 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use('/', require('./routes/indexRoute'))
app.use('/about', require('./routes/aboutRoute'))
app.use('/signup', require('./routes/signupRoute'))
app.use('/login', require('./routes/loginRoute'))

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);