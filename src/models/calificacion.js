import mongoose from 'mongoose';

const calificacionSchema = new mongoose.Schema({
    huesped: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', 
        required: true 
    },
    alojamiento: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento', 
        required: true 

    },
    reserva: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Reserva', 
        required: true, 
        unique: true 

    },
    estrellas: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 

    },
    comentario: { 
        type: String 
        
    },
}, {
  timestamps: true
});

export default mongoose.model('Calificacione', calificacionSchema);
