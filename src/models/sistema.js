import mongoose from "mongoose";


const sistemaSechema = new mongoose.Schema({
   
    saldoSistema:{
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: true,
})

export default mongoose.model('Sistema',sistemaSechema)