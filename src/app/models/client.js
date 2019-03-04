const mongoose = require("../../database/db.connect");
const addressModel = require("./address");


const model = new mongoose.Schema({
    name: {type: String, trim: true, required:true},
    email: {type: String, trim: true, required:true},
    phone: {type: String, trim: true, required:true},
    cell_phone: {type: String, trim: true, required:true},
    cpf: {type: String, trim: true, required:true},
    //address:  addressModel,
})

module.exports = mongoose.model("client", model); //'client' <= nome da collection no mongo