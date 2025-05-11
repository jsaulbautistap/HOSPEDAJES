import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const usuarioSchema = new Schema({
    rol: {
        type: [String],
        enum: ['huesped', 'anfitrion', 'admin'],
        default: ['huesped']
    },

    nombre: {
        type: String,
        required: true,
        trim: true 
    },
    apellido: { 
        type: String,
        required: true,
        trim: true
    },
    cedula: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true

    },
    telefono: { 
        type: Number, 
        trim: true

    },
    urlFotoPerfil: { 
        type: String,
        default: null
    },
    estadoCuenta: {
        type: String,
        enum: ['activo', 'inactivo', 'suspendido', 'eliminado'],
        default: 'activo'
    },
    saldoAnfitrion: { 
        type: Number, 
        default: 0 

    },
    
}, {
    // fecha de registro 
    timestamps: true
});



usuarioSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

usuarioSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

usuarioSchema.methods.crearToken = function () {
  const tokenGenerado = crypto.randomBytes(20).toString('hex');
  return tokenGenerado;
};

export default model('Usuario', usuarioSchema);
