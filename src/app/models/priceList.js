const mongoose = require("../../database/db.connect");

//Lista de Preço
const model = new mongoose.Schema({
    description: {type: String, trim: true, required: true},// Descrição
    deleted: {type: Boolean, default: false},// Deletado
})

module.exports = mongoose.model("priceList", model);