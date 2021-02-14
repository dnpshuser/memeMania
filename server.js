if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
})
.then( () => {console.log(`connected to the database...`)})
.catch( () => {console.log('Ooopsss..... Error connecting to the database')});


app.get('/', (req,res) => {
    res.redirect('/dashboard');
})

app.use('/post',postRouter);

app.use('/dashboard',indexRouter);


app.listen(port,() => {
    console.log(`listening to the port ${port}`);
})