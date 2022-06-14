// 1 ODM - Mongoose
import mongoose from 'mongoose';

// 2 Desestructuro el modulo de Schemas
// de Mongoose
const { Schema } = mongoose;

// 3 Creamos el Schema
// Schema: la descripcion de los datos que va a contener un objeto JSON
const ProjectSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Modelo: Es l objeto que servira como intermediario
// en una aplicacion y la base de datos, esto a traves
// de exponer un conjunto de metodo y propiedades
// de la aplicacion

// Generar el modelo a partir de un Schema
// Compilar el modelo (crear una instancia a partir del modelo)
export default mongoose.model('activity', ProjectSchema);
