const express = require('express');
const router = express.Router();

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
router.put('/actreporte/:id', async (req, res) => {
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

module.exports = router;
