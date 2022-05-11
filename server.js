const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const UserRoute = require('./routes/userRoute');


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/user', UserRoute)
const dbConfig = require('./config/database.config')
const res = require("express/lib/response");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


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