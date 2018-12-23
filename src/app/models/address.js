const mongoose = require("../../database/db.connect");

const model = new mongoose.Schema({
    street: {type: String, trim: true, require: true},
    house_number: {type: Number, trim: true, require: true},
    zip_code: {type: String, trim: true, require: true},
    complement: {type: String, trim: true, require: true},
    district: {type: String, trim: true, require: true},
    city: {type: String, trim: true, require: true},
    country: {type: String, trim: true, require: true}
})

module.exports = model;