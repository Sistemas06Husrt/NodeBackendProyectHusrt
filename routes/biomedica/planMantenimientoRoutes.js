const express = require('express');
const router = express.Router();
const PlanMantenimiento = require('../../models/Biomedica/PlanMantenimiento');
const Equipo = require('../../models/Biomedica/Equipo');

// Obtener todos los planes de mantenimiento
router.get('/planmantenimiento/', async (req, res) => {
    try {
        const planes = await PlanMantenimiento.findAll({
        });
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes de mantenimiento', detalle: error.message });
    }
});

// Obtener un plan de mantenimiento por ID
router.get('/planmantenimiento/:id', async (req, res) => {
    try {
        const plan = await PlanMantenimiento.findByPk(req.params.id, {
        });
        if (!plan) {
            return res.status(404).json({ error: 'Plan de mantenimiento no encontrado' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el plan de mantenimiento', detalle: error.message });
    }
});

router.get('/planmantenimientoequipo/:equipoId', async (req, res) => {
    try {
        const planes = await PlanMantenimiento.findAll({
            where: { equipoIdFk: req.params.equipoId },
        });
        if (planes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron planes de mantenimiento para este equipo' });
        }
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes de mantenimiento del equipo', detalle: error.message });
    }
});

// Crear un nuevo plan de mantenimiento
router.post('/planmantenimiento/', async (req, res) => {
    try {
        const nuevoPlan = await PlanMantenimiento.create(req.body);
        res.status(201).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el plan de mantenimiento', detalle: error.message });
    }
});

router.post('/planmantenimientomes', async (req, res) => {
    try {
        const { mes, ano } = req.body;

        if (!mes || !ano) {
            return res.status(400).json({ error: 'Mes y año son requeridos' });
        }

        const planes = await PlanMantenimiento.findAll({
            where: {
                mes: parseInt(mes),
                ano: parseInt(ano)
            },
            include: [{ model: Equipo, as: 'equipo' }]
        });

        if (planes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron planes de mantenimiento para el mes y año especificados' });
        }

        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes de mantenimiento mensuales', detalle: error.message });
    }
});

// Actualizar un plan de mantenimiento por ID
router.put('/planmantenimiento/:id', async (req, res) => {
    try {
        const plan = await PlanMantenimiento.findByPk(req.params.id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan de mantenimiento no encontrado' });
        }

        await plan.update(req.body);
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el plan de mantenimiento', detalle: error.message });
    }
});

// Eliminar un plan de mantenimiento por ID
router.delete('/planmantenimiento/:id', async (req, res) => {
    try {
        const plan = await PlanMantenimiento.findByPk(req.params.id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan de mantenimiento no encontrado' });
        }

        await plan.destroy();
        res.json({ mensaje: 'Plan de mantenimiento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el plan de mantenimiento', detalle: error.message });
    }
});

module.exports = router;
