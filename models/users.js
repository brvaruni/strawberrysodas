const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String
});

module.exports = mongoose.model('user', usersSchema);
