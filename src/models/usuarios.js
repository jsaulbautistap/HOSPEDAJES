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
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [10, 'La cédula no puede tener más de 10 dígitos'],
    match: [/^\d+$/, 'La cédula debe contener solo números']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'El formato del email no es válido']
  },

  password: {
    type: String,
    required: true,
  },

  telefono: {
    type: String,
    trim: true,
    match: [/^\+?\d+$/, 'El número de teléfono debe contener solo números y puede iniciar con +']
  },

  urlFotoPerfil: {
    type: String,
    default: null
  },
  public_idFotoPerfil: {
    type: String,
    default: null
  },
  estadoCuenta: {
    type: String,
    enum: ['activo', 'suspendido', 'eliminado'],
    default: 'activo'
  },

  saldoAnfitrion: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});



// Métodos
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
