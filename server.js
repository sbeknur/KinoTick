const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const ejs = require('ejs')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
const app = express();
const PORT = 3000;


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.set('view engine', ejs);
app.engine('ejs', require('ejs').__express);

app.use(methodOverride('_method'))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const UserRoute = require('./routes/UserRoute')

app.use('/', require('./routes/indexRoute'))
app.use('/about', require('./routes/aboutRoute'))
app.use('/signup', require('./routes/signupRoute'))
app.use('/admin', require('./routes/adminRoute'))
app.use('/user', UserRoute)

app.get('/', (req, res) => {
    res.render('/');
});

app.get('/find', (req, res) => {
    res.render('find');
});

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/delete', (req, res) => {
    res.render('delete');
});

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://sbeknur:qwerty123@cluster0.im96e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(process.env.PORT || PORT, () =>
            console.log(`App listening at http://localhost:${PORT}`)
        )
    } catch (e) {
        console.log(e)
    }
}

start()