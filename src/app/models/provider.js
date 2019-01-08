const mongoose = require("../../database/db.connect");

const model = new mongoose.Schema({
    name: {type: String, trim: true, required:true},
    email: {type: String, trim: true, required:true},
    phone: {type: String, trim: true, required:true},
    cell_phone: {type: String, trim: true, required:true},
    cnpj: {type: String, trim: true, required:true},
    //address:  addressModel,
})

module.exports = mongoose.model("provider", model); //'provider' <= nome da collection no mongo