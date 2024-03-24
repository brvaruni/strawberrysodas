const mongoose = require("mongoose");

const vehicleSchema=mongoose.Schema({
    PlateNum:{type:String,required:true},
    Slot:String,
    Entry:Date,
    Exit:Date,
    fare:Number
})


module.exports =  mongoose.model('Vehicle', vehicleSchema)