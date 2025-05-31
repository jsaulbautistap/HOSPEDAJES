import mongoose from "mongoose";

const FotoAlojamientoSchema = new mongoose.Schema({
  alojamiento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alojamiento",
    required: true
  },
  urlFoto: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true 
  },
  fotoPrincipal: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model("FotoAlojamiento", FotoAlojamientoSchema);
