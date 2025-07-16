const express = require('express');
const router = express.Router();
const PlanActividadMetrologica = require('../../models/Biomedica/PlanActividadMetrologica');
const Equipo = require('../../models/Biomedica/Equipo');

// Obtener todos los planes de actividad metrológica
router.get('/planactividadmetrologica', async (req, res) => {
    try {
        const planes = await PlanActividadMetrologica.findAll({
            include: [{ model: Equipo, as: 'equipo' }]
        });
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes de actividad metrológica', detalle: error.message });
    }
});

// Obtener un plan por ID
router.get('/planactividadmetrologica/:id', async (req, res) => {
    try {
        const plan = await PlanActividadMetrologica.findByPk(req.params.id, {
            include: [{ model: Equipo, as: 'equipo' }]
        });
        if (!plan) {
            return res.status(404).json({ error: 'Plan no encontrado' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el plan', detalle: error.message });
    }
});

// Obtener planes por equipo
router.get('/planmetrologiaequipo/:equipoId', async (req, res) => {
    try {
        const planes = await PlanActividadMetrologica.findAll({
            where: { equipoIdFk: req.params.equipoId }
        });
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes por equipo', detalle: error.message });
    }
});

// Obtener planes por mes y año
router.post('/planactividadmetrologica/mes', async (req, res) => {
    try {
        const { mes, ano } = req.body;
        if (!mes || !ano) {
            return res.status(400).json({ error: 'Mes y año son requeridos' });
        }

        const planes = await PlanActividadMetrologica.findAll({
            where: {
                mes: parseInt(mes),
                ano: parseInt(ano)
            },
            include: [{ model: Equipo, as: 'equipo' }]
        });

        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes por mes y año', detalle: error.message });
    }
});

// Crear un nuevo plan
router.post('/planactividadmetrologica', async (req, res) => {
    try {
        const nuevoPlan = await PlanActividadMetrologica.create(req.body);
        res.status(201).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el plan', detalle: error.message });
    }
});

// Actualizar un plan por ID
router.put('/planactividadmetrologica/:id', async (req, res) => {
    try {
        const plan = await PlanActividadMetrologica.findByPk(req.params.id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan no encontrado' });
        }

        await plan.update(req.body);
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el plan', detalle: error.message });
    }
});

// Eliminar un plan por ID
router.delete('/planactividadmetrologica/:id', async (req, res) => {
    try {
        const plan = await PlanActividadMetrologica.findByPk(req.params.id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan no encontrado' });
        }

        await plan.destroy();
        res.json({ mensaje: 'Plan eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el plan', detalle: error.message });
    }
});

module.exports = router;
