const express = require('express');
const router = express.Router();
const TipoEquipo = require('../models/TipoEquipo');

// Obtener todos los tipos de equipo
router.get('/', async (req, res) => {
    try {
        const tiposEquipos = await TipoEquipo.findAll();
        res.json(tiposEquipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tipos de equipo', detalle: error.message });
    }
});

// Obtener un tipo de equipo por ID
router.get('/:id', async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.findByPk(req.params.id);
        if (!tipoEquipo) {
            return res.status(404).json({ error: 'Tipo de equipo no encontrado' });
        }
        res.json(tipoEquipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el tipo de equipo', detalle: error.message });
    }
});

// Crear un nuevo tipo de equipo
router.post('/', async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.create(req.body);
        res.status(201).json(tipoEquipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tipo de equipo', detalle: error.message });
    }
});

// Actualizar un tipo de equipo
router.put('/:id', async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.findByPk(req.params.id);
        if (!tipoEquipo) {
            return res.status(404).json({ error: 'Tipo de equipo no encontrado' });
        }

        await tipoEquipo.update(req.body);
        res.json(tipoEquipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el tipo de equipo', detalle: error.message });
    }
});

// Eliminar un tipo de equipo
router.delete('/:id', async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.findByPk(req.params.id);
        if (!tipoEquipo) {
            return res.status(404).json({ error: 'Tipo de equipo no encontrado' });
        }

        await tipoEquipo.destroy();
        res.json({ mensaje: 'Tipo de equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el tipo de equipo', detalle: error.message });
    }
});

module.exports = router;
