
const mongoose = require("mongoose");

const parkingSchema=mongoose.Schema({
    PlateNum:{type:String,required:true},
    slot:String
})


module.exports =  mongoose.model('park', parkingSchema)