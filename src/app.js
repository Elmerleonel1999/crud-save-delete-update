const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myConnection');
const express = require('express');
const app = express();

const customerRoutes = require('./routes/customer');

//settings
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));


//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'crud_nodejs_mysql'
},
'single'));

app.use(express.urlencoded({extended:false}));

//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
  console.log(`Servido activo en puerto ${app.get('port')}`.bgBrightGreen.black.bold);
});