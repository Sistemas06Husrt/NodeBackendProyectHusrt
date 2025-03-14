const express = require('express');
const router = express.Router();
const Servicio = require('../../models/generales/Servicio');

// Obtener todos los servicios
router.get('/servicios', async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios', detalle: error.message });
    }
});

// Obtener un servicio por ID
router.get('/servicios/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findByPk(req.params.id);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el servicio', detalle: error.message });
    }
});

// Crear un nuevo servicio
router.post('/addservicio', async (req, res) => {
    try {
        const servicio = await Servicio.create(req.body);
        res.status(201).json(servicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio', detalle: error.message });
    }
});

// Actualizar un servicio
router.put('/servicios/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findByPk(req.params.id);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        await servicio.update(req.body);
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el servicio', detalle: error.message });
    }
});

// Eliminar un servicio
router.delete('/servicios/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findByPk(req.params.id);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        await servicio.destroy();
        res.json({ mensaje: 'Servicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el servicio', detalle: error.message });
    }
});

module.exports = router;
