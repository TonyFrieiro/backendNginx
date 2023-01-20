import mongoose from 'mongoose'
import productosModel from "../models/Productos.js"

const connection = mongoose.connect("mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/galeria?retryWrites=true&w=majority")

class ContenedorMongoDb {

    // constructor(nombreColeccion, esquema) {
    //     this.coleccion = mongoose.model(nombreColeccion, esquema)
    // }

    listar = async (id) => {
      return await productosModel.findOne({_id: id})
    }

    listarAll = async()=> {
      return await productosModel.find({})
    }

    guardar = async(document)=> {
    //   document.timestamp = Date.now()
    //   document.code = stringAleatorio(10)
      const documentSaveModel = new productosModel(document)
      const saveOne_ = await documentSaveModel.save()
      return saveOne_._id.valueOf()
    }

    actualizar = async(documentoActualizado, id) =>{
      await productosModel.updateOne({_id: id}, {$set: {...documentoActualizado}})
    }

    borrar = async(id) => {
      await productosModel.deleteOne({_id: id})
    }

    borrarAll = async()=> {
      await productosModel.deleteMany({})
        }
    }

// module.exports = {ContenedorMongoDb}
export default ContenedorMongoDb