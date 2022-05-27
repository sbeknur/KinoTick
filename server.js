const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const ejs = require('ejs')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
// const swaggerUi = require('swagger-ui-express')
const connectDb = require("./config/db");

const cookieParser = require('cookie-parser')
const roleMiddleware = require('./middlewares/roleMiddleware')

const {
    catchphrases
} = require("./routes/index");
// const swaggerJsDoc = require('swagger-jsdoc');
// swaggerDocument = require('./swagger.json');
const app = express();
const PORT = 3000;


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

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

app.use('/', require('./routes/indexRoute'))
app.use('/about', require('./routes/aboutRoute'))
app.use('/signup', require('./routes/signRouter'))
app.use('/admin', roleMiddleware(['ADMIN']), require('./routes/adminRouter'))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'index',
        active: 'index',
        isAuth: req.cookies.isAuth,
        isAdmin: req.cookies.isAdmin
    })
})

connectDb();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Catchphrases REST API',
            description: "A REST API built with Express and MongoDB. This API provides movie catchphrases and the context of the catchphrase in the movie."
        },
    },
    apis: ["./routes/catchphrases.js"]
}

app.use('/catchphrases', catchphrases)

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(process.env.PORT || 3000, () => console.log(`http://localhost:3000`));