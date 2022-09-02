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
const Blog = require('./models/blog')
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());

app.set('view engine', 'ejs')
app.use(express.static('public'))

const mongodb = require('./staff/mongo.js')

var flash = require('express-flash')

app.get('/', function (req, res) {
    Blog.find().sort({createdAt : -1}) // 1 İse ilk yazı -1 ise son yazı
    
            .then((result) => {
                res.render('index',{
                    blog: result,
                    role : 'Üye',
                    title : "Switch Space | Ana Sayfa",
                    favicon : "https://cdn.discordapp.com/avatars/1003213781058469971/78efb403d6eb746d5f0b3d292feae178.png"

                })        
            })
            .catch((err) => {
                console.log(err)
            })
})

app.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'Register'
    })
})

app.post('/register', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const role = 'Üye'
    User.findOne({ username }, (err, doc) => {
        if (err) {
            console.error(err)
        } else {
            console.log(`${username} şuan da başka biri tarafından kullanılıyor`)
            res.render('register')
        }
    })

    const users = {
        username,
        email,
        password,
        role
    }   
    const user = new User(users) // Yeni bir kullanıcı satırı oluşturalım.

    user.save((err, doc) => { // Yeni oluşturduğumuz satırı işleyelim.
        if (err) {
            console.error('Hata')
        } else {
            console.log(`${username} isimli kullanıcı kayıt oldu.`)
        }
    })
})

app.get('/login',(req,res,next) => {
    res.render('login',{
        title : 'Login'
    })
})

app.post('/home',(req,res,next) => {
    const userİnfo = {
        username : req.body.username,
        password : req.body.password
    }
    var username = userİnfo.username
    var password = userİnfo.password
    User.findOne({ username:username , password : password }, (err, doc) => {
        if (err) {
            console.error(err)
        } 
        else if (!doc) {
            res.render('login',{
                title : 'Login'
            })
        }
        else if (doc.role == "Founder"){
            role = "Founder"
            res.render('admin-panel',{
                role,
                username,
            })
        }
        else{
            Blog.find().sort({createdAt : -1}) // 1 İse ilk yazı -1 ise son yazı
    
            .then((result) => {
                res.render('home',{
                    blog: result,
                    username,
                    role : 'Üye'
                })        
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
})

app.post('/projects/blog/add',(req,res,next) => {
    const title = req.body.title 
    const short = req.body.short
    const long = req.body.long
    const image = req.body.image
    const tag = req.body.tag

    const blogİnfo = {
        title ,
        short,
        long,
        image,
        tag
    }

    if (title == undefined || short == undefined || long == undefined || image == undefined || tag == undefined) {
        console.log('Boş gönderi ekleyemem')
    }
    else {
        const blog = new Blog(blogİnfo) // Yeni bir kullanıcı satırı oluşturalım.
        blog.save((err, doc) => { // Yeni oluşturduğumuz satırı işleyelim.
            if (err) {
                console.error(err)
            } else {
                console.log(`Blog'a bir gönderi eklendi`)
            }
        })
    }
    

    res.render('projects/blog/add',{

    })
})
app.post('/projects/blog/blog/:id' , (req,res,next) => {
    const id = req.params.id 
    Blog.findById(id)
        .then((result) => {
            res.render('projects/blog/blog',{blog : result})
        })
})

//Handling user logout
app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


/* 
const id = req.params.id 
    Code.findById(id)
        .then((result) => {
            res.render('projects/blog/code',{code : result})
        })
        */
