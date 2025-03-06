const express = require('express');
const router = express.Router();
const HojaVida = require('../../models/Biomedica/HojaVida');
const Equipo = require('../../models/Biomedica/Equipo');

// Obtener todas las hojas de vida
router.get('/', async (req, res) => {
    try {
        const hojasVida = await HojaVida.findAll({
            include: { model: Equipo, as: 'equipo' }
        });
        res.json(hojasVida);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las hojas de vida', detalle: error.message });
    }
});

// Obtener una hoja de vida por ID
router.get('/:id', async (req, res) => {
    try {
        const hojaVida = await HojaVida.findByPk(req.params.id, {
            include: { model: Equipo, as: 'equipo' }
        });
        if (!hojaVida) {
            return res.status(404).json({ error: 'Hoja de vida no encontrada' });
        }
        res.json(hojaVida);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la hoja de vida', detalle: error.message });
    }
});

// Crear una nueva hoja de vida
router.post('/', async (req, res) => {
    try {
        const nuevaHojaVida = await HojaVida.create(req.body);
        res.status(201).json(nuevaHojaVida);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la hoja de vida', detalle: error.message });
    }
});

// Actualizar una hoja de vida
router.put('/:id', async (req, res) => {
    try {
        const hojaVida = await HojaVida.findByPk(req.params.id);
        if (!hojaVida) {
            return res.status(404).json({ error: 'Hoja de vida no encontrada' });
        }

        await hojaVida.update(req.body);
        res.json(hojaVida);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la hoja de vida', detalle: error.message });
    }
});

// Eliminar una hoja de vida
router.delete('/:id', async (req, res) => {
    try {
        const hojaVida = await HojaVida.findByPk(req.params.id);
        if (!hojaVida) {
            return res.status(404).json({ error: 'Hoja de vida no encontrada' });
        }

        await hojaVida.destroy();
        res.json({ mensaje: 'Hoja de vida eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la hoja de vida', detalle: error.message });
    }
});

module.exports = router;
