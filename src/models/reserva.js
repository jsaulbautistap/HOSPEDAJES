import mongoose from "mongoose";


const reservaSchema = new mongoose.Schema({
    huesped: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamiento',
        required: true
    },

    fechaCheckIn: {
        type: Date,
        required: true
    },
    fechaCheckOut:{
        type: Date,
        required: true
    },
    numeroHuespedes:{
        type: Number,
        required: true,
        min: 1
    },
    precioTotal:{
        type: Number,
        required: true,
        min: 0
    },
    estadoReserva:{
        type: String,
        enum: ['pendiente','confirmada','cancelada','finalizada'],
        default: 'pendiente'
    },
    estadoPago:{
        type: String,
        enum: ['pendiente', 'pagado', 'cancelado'],
        default: 'pendiente'
    }
},
{
    timestamps: true,
    
})


export default mongoose.model('Reserva', reservaSchema);