const express=require('express');
const app=express();
const morgan=require('morgan');
const body_parser=require('body-parser');
const ejs=require('ejs');
const cookie_parser=require('cookie-parser');
const session=require('express-session');
const mongoose=require('mongoose');
const port=process.env.PORT||3000;

//mongo database setup
const configDB=require('./config/database.js');
mongoose.connect(configDB.url);

//create morgan, a login middleware
app.use(morgan('dev'));
//log client and server transaction. saves cookies(not neccesary)
app.use(cookie_parser());
//html form accepts text, arrays, objects, etc.
app.use(body_parser.urlencoded({extended: true}));
app.use(session({secret: 'anystringoftext',
                 saveUninitialized: true,
                 resave: true}));

//set template engine for webpages
app.set('view engine', 'ejs');

require('./app/routes.js')(app);

app.listen(port);
console.log('server running on port: '+port);
