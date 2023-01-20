import mongoose from "mongoose";

const collection = "productos"

const schema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String
    },
    foto:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    stock:{
        type:Number
    }

})

const productosModel = mongoose.model(collection,schema)

export default productosModel