import mongoose from 'mongoose';

const ReporteSchema = new mongoose.Schema({
  reportante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipoReportado: {
    type: String,
    enum: ['usuario', 'alojamiento'],
    required: true
  },
  idReportado: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  motivo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'revisado', 'rechazado'],
    default: 'pendiente'
  },
  
}, {
  timestamps: true
});

export default mongoose.model('Reporte', ReporteSchema);
