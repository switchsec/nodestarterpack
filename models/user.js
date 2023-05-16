const mongoose = require ('mongoose') // Mongoose örnek şema örneği projenizde kullanmayacaksanız silebilirsiniz

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    password : {
        type : String, // string olduğunu belirtiyoruz
        require : true // require true diyerek oluşturulmasını zorunlu tutuyoruz
    },
}, { timestamps : true })

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema) // Şemaya kullanırken ulaşacağımız isimi User olarak ayarlıyoruz
module.exports = User
