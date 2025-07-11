// controllers/reportes_controller.js

import Reporte from '../models/reporte.js';
import Usuario from '../models/usuarios.js';
import Alojamiento from '../models/alojamientos.js';
import Reserva from '../models/reserva.js';

// Crear un nuevo reporte
const crearReporte = async (req, res) => {
  try {
    const { tipoReportado, idReportado, motivo } = req.body;
    const reportante = req.usuario._id;

    // Validar existencia del reportado
    if (tipoReportado === 'usuario') {
      const usuario = await Usuario.findById(idReportado);
      if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
    } else if (tipoReportado === 'alojamiento') {
      const alojamiento = await Alojamiento.findById(idReportado);
      if (!alojamiento) return res.status(404).json({ msg: 'Alojamiento no encontrado' });
    }

    const filtroReserva = {
      huesped: reportante,
      estadoReserva: 'finalizada'
    };

    if (tipoReportado === 'usuario') {
      const alojamientosDelAnfitrion = await Alojamiento.find({ anfitrion: idReportado }).distinct('_id');
      filtroReserva.alojamiento = { $in: alojamientosDelAnfitrion };
    } else if (tipoReportado === 'alojamiento') {
      filtroReserva.alojamiento = idReportado;
    }

    const reservaFinalizada = await Reserva.findOne(filtroReserva);
    if (!reservaFinalizada) {
      return res.status(403).json({ msg: 'Solo puedes reportar si tuviste una reserva finalizada con este usuario o alojamiento.' });
    }

    // Crear el reporte
    const nuevoReporte = await Reporte.create({
      reportante,
      tipoReportado,
      idReportado,
      motivo
    });

    res.status(201).json({ msg: 'Reporte creado correctamente', reporte: nuevoReporte });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el reporte', error: error.message });
  }
};


// Obtener todos los reportes ADMINISTRADOR
const verTodosLosReportes = async (req, res) => {
  try {
    const { tipo } = req.query; 
    const filtro = tipo ? { tipoReportado: tipo } : {};

    const reportes = await Reporte.find(filtro)
      .populate('reportante', 'nombre apellido email')
      .sort({ createdAt: -1 });

    res.status(200).json(reportes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los reportes', error: error.message });
  }
};

// Ver reportes hechos por el usuario 
const verMisReportes = async (req, res) => {
  try {
    const reportante = req.usuario._id;
    const misReportes = await Reporte.find({ reportante })
      .sort({ createdAt: 1 });

    res.status(200).json(misReportes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener tus reportes', error: error.message });
  }
};

// Cambiar el estado de un reporte ADMINISTRADOR
const cambiarEstadoReporte = async (req, res) => {
  try {
    const { reporteId } = req.params;
    const { estado } = req.body;

    const reporte = await Reporte.findById(reporteId);
    if (!reporte) return res.status(404).json({ msg: 'Reporte no encontrado' });

    // Cambiar el estado del reporte
    reporte.estado = estado;
    await reporte.save();

    let resultadoSuspension = null;

    if (estado === 'revisado' ) {
      if (reporte.tipoReportado === 'usuario') {
        const usuario = await Usuario.findById(reporte.idReportado);
        if (usuario) {
          usuario.estadoCuenta = 'suspendido';
          await usuario.save();
          resultadoSuspension = 'Usuario suspendido correctamente';
        }
      } else if (reporte.tipoReportado === 'alojamiento') {
        const alojamiento = await Alojamiento.findById(reporte.idReportado);
        if (alojamiento) {
          alojamiento.estadoAlojamiento = 'inactivo';
          await alojamiento.save();
          resultadoSuspension = 'Alojamiento suspendido correctamente';
        }
      }
    }

    res.status(200).json({
      msg: 'Estado del reporte actualizado',
      reporte,
      ...(resultadoSuspension && { suspension: resultadoSuspension })
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al cambiar el estado del reporte', error: error.message });
  }
};


export {
  crearReporte,
  verTodosLosReportes,
  verMisReportes,
  cambiarEstadoReporte
};
