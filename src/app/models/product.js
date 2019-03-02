const mongoose = require("../../database/db.connect");


const model = new mongoose.Schema({
    description: {type: String, trim: true, required: true},//Descrição
    barcode: {type: String, trim: true, required: true},//Código de Barra
    group: {type: String, trim: true, required: true},//Grupo
    provider: {type: String, trim: true, required: true},//Fornecedor
    purchase_unit: {type: String, trim: true, required: true},//Unidade de Compra
    // purchase_quantity: {type: Number, trim: true, required: true},//Quantidade de Compra
    // sale_unit: {type: String, trim: true, required: true},//Unidade de Venda
    // sale_quantity: {type: Number, trim: true, required: true},//Quantidade de Vanda
    // cost_value: {type: Number, trim: true, required: true},//Valor de Custo
    // minimum_quantity: {type: Number, trim: true, required: true},//Quantidade Mínima
    // maximum_quantity: {type: Number, trim: true, required: true},//Quantidade Máxima
    deleted: {type: Boolean, default: false},//Deletado
})

module.exports = mongoose.model("product", model);