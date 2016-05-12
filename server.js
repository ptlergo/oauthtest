const express=require('express');
const app=express();
const morgan=require('morgan');
const cookie_parser=require('cookie-parser');
const session=require('express-session');
const port=process.env.PORT||3000;
const mongoose=require('mongoose');

//mongo database setup
const configDB=require('./config/database.js');
mongoose.connect(configDB.url);

//create morgan, a login middleware
app.use(morgan('dev'));
//log client and server transaction. saves cookies(not neccesary)
app.use(cookie_parser());
app.use(session({secret: 'anystringoftext',
                 saveUninitialized: true,
                 resave: true}));


require('./app/routes.js')(app);

app.listen(port);
console.log('server running on port: '+port);
