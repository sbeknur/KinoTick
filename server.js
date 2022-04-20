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

const request = require('request');

const options = {
    method: 'GET',
    url: 'https://movie-database-alternative.p.rapidapi.com/',
    qs: {
        s: 'Avengers Endgame',
        r: 'json',
        page: '1'
    },
    headers: {
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
        'X-RapidAPI-Key': 'cd00fcd714mshf9223431d2d8454p1cf2a8jsn8b22ed9f222b',
        useQueryString: true
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);