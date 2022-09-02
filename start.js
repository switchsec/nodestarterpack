var express = require("express")
var app = express()
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportLocalMongoose = require("passport-local-mongoose");

const bodyParser = require('body-parser');
const { rawListeners } = require('process');
const req = require('express/lib/request');
const { render } = require('ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }))

app.use(require("express-session")({
    secret: "very secret words",
    resave: false,
    saveUninitialized: false
}));
const User = require('./models/user.js')


app.set('view engine', 'ejs')
app.use(express.static('public'))

const mongodb = require('./staff/mongo.js')

app.get('/', function (req, res) {
    res.render('index')
})



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


