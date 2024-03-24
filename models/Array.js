
const mongoose = require("mongoose");
const arraySchema=mongoose.Schema({
    SLOT:String
})


module.exports =  mongoose.model('array', arraySchema)