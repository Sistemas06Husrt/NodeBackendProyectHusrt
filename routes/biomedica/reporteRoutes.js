const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Reporte = require('../../models/Biomedica/Reporte');
const Equipo = require('../../models/Biomedica/Equipo');
const Servicio = require('../../models/generales/Servicio');
const Usuario = require('../../models/generales/Usuario');

// Obtener todos los reportes
router.get('/reportes', async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Servicio, as: 'servicio' },
        { model: Usuario, as: 'usuario' }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los reportes', detalle: error.message });
  }
});

// Obtener un reporte por ID
router.get('/reporte/:id', async (req, res) => {
  try {
    const reporte = await Reporte.findByPk(req.params.id, {
      include: ['equipo', 'servicio', 'usuario']
    });
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el reporte', detalle: error.message });
  }
});

// Crear un nuevo reporte
router.post('/addreporte', async (req, res) => {
  try {
    const nuevoReporte = await Reporte.create(req.body);
    res.status(201).json(nuevoReporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el reporte', detalle: error.message });
  }
});

// Actualizar un reporte
router.put('/actualizarreporte/:id', async (req, res) => {
  try {
    const reporte = await Reporte.findByPk(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });

    await reporte.update(req.body);
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el reporte', detalle: error.message });
  }
});

// Eliminar un reporte
router.delete('/remreporte/:id', async (req, res) => {
  try {
    const reporte = await Reporte.findByPk(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });

    await reporte.destroy();
    res.json({ mensaje: 'Reporte eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el reporte', detalle: error.message });
  }
});

// Obtener reportes por equipo
router.get('/reportes/equipo/:id', async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      where: { equipoIdFk: req.params.id },
      include: ['equipo', 'servicio', 'usuario']
    });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes por equipo', detalle: error.message });
  }
});

router.post('/reportes/preventivosmes', async (req, res) => {
  try {
    const { mes, anio } = req.body;
    if (!mes || !anio) {
      return res.status(400).json({ error: 'Se requieren los parámetros mes y anio' });
    }

    const reportes = await Reporte.findAll({
      where: {
        tipoMantenimiento: 'Preventivo',
        mesProgramado: parseInt(mes),
        añoProgramado: parseInt(anio),
      },
      include: ['equipo', 'servicio', 'usuario'],
    });

    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes preventivos programados', detalle: error.message });
  }
});

// Correctivos en rango de fecha
router.post('/reportes/correctivosmes', async (req, res) => {
  try {
    const { mes, anio } = req.body;

    if (!mes || !anio) {
      return res.status(400).json({ error: 'Debe proporcionar mes y año en el cuerpo de la solicitud' });
    }

    const fechaInicio = new Date(anio, mes - 1, 1);
    const fechaFin = new Date(anio, mes, 0);

    const reportes = await Reporte.findAll({
      where: {
        fechaRealizado: {
          [Op.between]: [fechaInicio.toISOString().split('T')[0], fechaFin.toISOString().split('T')[0]],
        },
      },
      include: ['equipo', 'servicio', 'usuario'],
    });

    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes por fecha realizada', detalle: error.message });
  }
});



// Obtener reportes por servicio
router.get('/reportes/servicio/:id', async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      where: { servicioIdFk: req.params.id },
      include: ['equipo', 'servicio', 'usuario']
    });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes por servicio', detalle: error.message });
  }
});

// Obtener reportes por usuario
router.get('/reportes/usuario/:id', async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      where: { usuarioIdFk: req.params.id },
      include: ['equipo', 'servicio', 'usuario']
    });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes por usuario', detalle: error.message });
  }
});

router.get('/reportes/usuario/:id', async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      where: { usuarioIdFk: req.params.id },
      include: ['equipo', 'servicio', 'usuario']
    });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes por usuario', detalle: error.message });
  }
});

module.exports = router;
