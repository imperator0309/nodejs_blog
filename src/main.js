const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middleware/SortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);

//http logger
// app.use(morgan('combined'));

//template engine
app.engine('hbs', handlebars.create({
    extname: ".hbs",
    helpers: require('./helpers/handlebars'),
}).engine)

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));

//routes init
route(app);

app.listen(port, ()=> console.log(`App listening at http://localhost:${port}`));