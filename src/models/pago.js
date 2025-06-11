import mongoose from "mongoose";


const pagoSchema = new mongoose.Schema({

    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva',
        required: true
    },
    huesped: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    montoTotal:{
        type:Number,
        required: true,

    },
    comisionSistema:{
        type:Number,
        required: true,

    },
    montoAnfitrion:{
        type:Number,
        required: true,

    },
},
{
    timestamps: true,
});


export default mongoose.model('Pago', pagoSchema)