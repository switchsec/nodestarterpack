const mongoose = require ('mongoose')
const Schema = mongoose.Schema


const blogSchema = new Schema({
    title : {
        type : String,
    },
    short : {
        type : String, // string olduğunu belirtiyoruz
    },
    image :{
        type : String,
    }
    
}, { timestamps : true })


const Blog = mongoose.model('Blog', blogSchema) // Şemaya kullanırken ulaşacağımız isimi Blog olarak ayarlıyoruz

module.exports = Blog
