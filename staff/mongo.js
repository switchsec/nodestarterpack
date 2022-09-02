const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

require("dotenv").config();

const dbURL = url
mongoose.connect(dbURL , {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Mongodb bağlantısı başarıyla kuruldu .'))
    .catch((err) => console.log(err))

module.exports = router
