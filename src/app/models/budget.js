const mongoose = require("../../database/db.connect");

// Orçamento
const model = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required: true},// Id do Cliente
    date: {type: Date, default: Date.now},// Data do orçamento
    inspiration_date: {type: Date},// Data de Inspiração
    note: {type: String, trim: true},// Observação
    paymentForm: {type: mongoose.Schema.Types.ObjectId, ref: 'paymentForm',required: true},// Id da Forma de Pagamento
    deleted: {type: Boolean, default: false},// Deletado
    item: [{
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'product',required: true},// Id do Produto
            priceList: {type: mongoose.Schema.Types.ObjectId, ref: 'priceList',required: true},// Id da Lista de Preço
            amount: {type: Number, trim: true, required: true},// Quantidade
            discount: {type: Number, trim: true},// Desconto
            total_value: {type: Number, trim: true, required: true},// Valor Total
        }],
})

module.exports = mongoose.model("budget", model);