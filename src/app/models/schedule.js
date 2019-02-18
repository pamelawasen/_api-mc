const mongoose = require("../../database/db.connect");

//Agenda
const model = new mongoose.Schema({
    date: {type: Date, trim: true, required: true},// Data
    hour: {type: Date, trim: true, required: true},// Hora
    note: {type: String, trim: true, required: true},// Observação
    id_order: {type: String, trim: true, required: true},// Id do Pedido
    deleted: {type: Boolean, default: false},// Deletado
})

module.exports = mongoose.model("schedule", model);