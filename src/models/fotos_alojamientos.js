import mongoose from "mongoose";

const FotoAlojamientoSchema = new mongoose.Schema({
  alojamiento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alojamiento",
    required: true
  },
  urlFoto: { 

    type: String, 
    required: true 

  },
  fotoPrincipal: { 

    type: Boolean, 
    default: false 

  },
  fechaSubida: { 

    type: Date, 
    default: Date.now 

  }
}, {
  timestamps: true
});

export default mongoose.model("FotoAlojamiento", FotoAlojamientoSchema);
