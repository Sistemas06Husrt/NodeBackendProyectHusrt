const express = require('express');
const router = express.Router();
const Equipo = require('../../models/Biomedica/Equipo');
const TipoEquipo = require('../../models/Biomedica/TipoEquipo');
const Servicio = require('../../models/Biomedica/Servicio');
const Sede = require('../../models/Biomedica/Sede');
const Responsable = require('../../models/Biomedica/Responsable');

// Obtener todos los equipos
router.get('/equipos/', async (req, res) => {
    try {
        const equipos = await Equipo.findAll({
            include: [
                { model: TipoEquipo, as: 'tipoEquipos' },
                { model: Servicio, as: 'servicios' },
                { model: Sede, as: 'sedes' },
                { model: Responsable, as: 'responsables' }
            ]
        });
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los equipos', detalle: error.message });
    }
});

// Obtener un equipo por ID
router.get('/equipo/:id', async (req, res) => {
    try {
        const equipo = await Equipo.findByPk(req.params.id, {
            include: [
                { model: TipoEquipo, as: 'tipoEquipos' },
                { model: Servicio, as: 'servicios' },
                { model: Sede, as: 'sedes' },
                { model: Responsable, as: 'responsables' }
            ]
        });

        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json(equipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el equipo', detalle: error.message });
    }
});

// Crear un nuevo equipo
router.post('/addequipo/', async (req, res) => {
    try {
        const equipo = await Equipo.create(req.body);
        res.status(201).json(equipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el equipo', detalle: error.message });
    }
});

// Actualizar un equipo
router.put('/Actequipo/:id', async (req, res) => {
    try {
        const equipo = await Equipo.findByPk(req.params.id);
        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        await equipo.update(req.body);
        res.json(equipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el equipo', detalle: error.message });
    }
});

// Eliminar un equipo
router.delete('/remequipo/:id', async (req, res) => {
    try {
        const equipo = await Equipo.findByPk(req.params.id);
        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        await equipo.destroy();
        res.json({ mensaje: 'Equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el equipo', detalle: error.message });
    }
});

module.exports = router;
