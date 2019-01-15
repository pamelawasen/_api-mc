const mongoose = require("../../database/db.connect");


const model = new mongoose.Schema({
    name: {type: String, trim: true, required:true},
    email: {type: String, trim: true, required:true},
    phone: {type: String, trim: true, required:true},
    role: {type: String, trim: true, required:true},
    //address:  addressModel,
})

module.exports = mongoose.model("admin", model); //'admin' <= nome da collection no mongo