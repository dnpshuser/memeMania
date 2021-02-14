if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dburl = process.env.DATABASE_URL || 'mongodb://localhost/CrioStage2B';
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const memesRouter = require('./routes/memes');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

mongoose.connect(dburl, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
})
.then( () => {console.log(`connected to the database... ${dburl}`)})
.catch( () => {console.log('Ooopsss..... Error connecting to the database')});

app.use('/memes',memesRouter);
app.use('/post',postRouter);

app.use('/',indexRouter);


app.listen(port,() => {
    console.log(`listening to the port ${port}`);
})