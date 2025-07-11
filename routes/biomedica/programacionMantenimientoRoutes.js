const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const  PlanMantenimiento  = require('../../models/Biomedica/PlanMantenimiento');
const  Reporte = require('../../models/Biomedica/Reporte');

router.post('/programacionpreventivos', async (req, res) => {
    const reportes = [];
    try {
        const { mes, anio } = req.body;

        if (!mes || !anio) {
            return res.status(400).json({ error: 'Debe proporcionar mes y año en el cuerpo de la solicitud' });
        }
        const planMantenimiento = await PlanMantenimiento.findAll({
            where: {
                mes: mes,
                ano: anio
            },
            include: ['equipo'],
        });

        for (const plan of planMantenimiento) {
            const nuevoReporte = {
                añoProgramado: plan.ano,
                mesProgramado: plan.mes,
                tipoMantenimiento: 'Preventivo',
                servicioIdFk: plan.equipo.servicioIdFk,
                equipoIdFk: plan.equipo.id 
            };
            const reporte = await Reporte.create(nuevoReporte);
            reportes.push(reporte);

        };

        res.json(reportes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el plan de mantenimiento en la fecha seleccionada', detalle: error.message });
    }
});

module.exports = router;