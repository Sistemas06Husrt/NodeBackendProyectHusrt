const express = require('express');
const router = express.Router();
const PlanMantenimiento = require('../../models/Biomedica/PlanMantenimiento');
const Equipo = require('../../models/Biomedica/Equipo');

// Obtener todos los planes de mantenimiento
router.get('/', async (req, res) => {
    try {
        const planes = await PlanMantenimiento.findAll({
            include: [{ model: Equipo, as: 'equipo' }],
        });
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes de mantenimiento', detalle: error.message });
    }
});

// Obtener un plan de mantenimiento por ID
router.get('/:id', async (req, res) => {
    try {
        const plan = await PlanMantenimiento.findByPk(req.params.id, {
            include: [{ model: Equipo, as: 'equipo' }],
        });
        if (!plan) {
            return res.status(404).json({ error: 'Plan de mantenimiento no encontrado' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el plan de mantenimiento', detalle: error.message });
    }
});

// Crear un nuevo plan de mantenimiento
router.post('/', async (req, res) => {
    try {
        const nuevoPlan = await PlanMantenimiento.create(req.body);
        res.status(201).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el plan de mantenimiento', detalle: error.message });
    }
});

// Actualizar un plan de mantenimiento por ID
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
