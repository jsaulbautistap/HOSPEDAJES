import mongoose from "mongoose";

const AlojamientoSchema = new mongoose.Schema({
    
  anfitrion: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  titulo: {
    
    type: String, 
    required: true 
  },
  descripcion: {

    type: String,
    required: true

  },
  tipoAlojamiento: { 


    type: String, 
    required: true 

  },
  precioNoche: { 


    type: Number, 
    required: true 

  },
  maxHuespedes: { 

    type: Number, 
    required: true 

  },
  estadoAlojamiento: {

    type: String,
    enum: ["activo", "inactivo", "eliminado"],
    default: "activo"
  },
  calificacionPromedio: { 

    type: Number, 
    default: 0 

  },
  ciudad: { 

    type: String, 
    required: true 

  },
  provincia: { 

    type: String, 
    required: true 

  },
  pais: { 

    type: String, 
    required: true 
    
  },
  direccion: { 

    type: String, 
    required: true 

  },

},{
  timestamps: true
});

export default mongoose.model("Alojamiento", AlojamientoSchema);
