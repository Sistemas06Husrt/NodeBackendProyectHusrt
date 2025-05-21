const express = require('express');
const router = express.Router();
const Equipo = require('../../models/Biomedica/Equipo');
const Usuario = require('../../models/generales/Usuario');
const ActividadMetrologica = require('../../models/Biomedica/ActividadMetrologica');


// Obtener todas las actividades metrológicas
router.get('/actividades', async (req, res) => {
  try {
    const actividades = await ActividadMetrologica.findAll({
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Usuario, as: 'usuarioAprobo' }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las actividades', detalle: error.message });
  }
});

// Obtener una actividad por ID
router.get('/actividad/:id', async (req, res) => {
  try {
    const actividad = await ActividadMetrologica.findByPk(req.params.id, {
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Usuario, as: 'usuarioAprobo' }
      ]
    });
    if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json(actividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la actividad', detalle: error.message });
  }
});

// Crear una nueva actividad
router.post('/addactividad', async (req, res) => {
  try {
    const nuevaActividad = await ActividadMetrologica.create(req.body);
    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la actividad', detalle: error.message });
  }
});

// Actualizar una actividad
router.put('/actactividad/:id', async (req, res) => {
  try {
    const actividad = await ActividadMetrologica.findByPk(req.params.id);
    if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });

    await actividad.update(req.body);
    res.json(actividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la actividad', detalle: error.message });
  }
});

// Eliminar una actividad
router.delete('/remactividad/:id', async (req, res) => {
  try {
    const actividad = await ActividadMetrologica.findByPk(req.params.id);
    if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });

    await actividad.destroy();
    res.json({ mensaje: 'Actividad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la actividad', detalle: error.message });
  }
});

// Obtener actividades por equipo
router.get('/actividades/equipo/:id', async (req, res) => {
  try {
    const actividades = await ActividadMetrologica.findAll({
      where: { equipoIdFk: req.params.id },
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Usuario, as: 'usuarioAprobo' }
      ]
    });
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividades por equipo', detalle: error.message });
  }
});

// Obtener actividades por usuario
router.get('/actividades/usuario/:id', async (req, res) => {
  try {
    const actividades = await ActividadMetrologica.findAll({
      where: { usuarioIdFk: req.params.id },
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Usuario, as: 'usuarioAprobo' }
      ]
    });
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividades por usuario', detalle: error.message });
  }
});

module.exports = router;
