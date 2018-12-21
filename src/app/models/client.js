import mongoose from "../../database/db.connect";
import addressModel from "./address";

const model = new mongoose.Schema({
    name: {type: String, trim: true, required:true},
    email: {type: String, trim: true, required:true},
    password: {type: String, trim: true, required:true},
    phone: {type: String, trim: true, required:true},
    cell_phone: {type: String, trim: true, required:true},
    address:  addressModel,
})

export default mongoose.model("user", model); //'user' <= nome da collection no mongo