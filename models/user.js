const mongoose = require ('mongoose')
const Schema = mongoose.Schema
var passport = require("passport");

var passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    password : {
        type : String, // string olduğunu belirtiyoruz
        require : true // require true diyerek oluşturulmasını zorunlu tutuyoruz
    },
    email : {
        type : String,
        require : true
    },
    role : {
        type : String
    }
    
}, { timestamps : true })

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema) // Şemaya kullanırken ulaşacağımız isimi Blog olarak ayarlıyoruz
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = User