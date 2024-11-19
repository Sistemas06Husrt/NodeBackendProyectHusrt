const Rol = require('../models/Rol')
const { Router, request } = require('express');
const app = Router();


app.post('/addrole', async (req, res) => {
    try {
      const { nombre } = req.body;
  
      const newRol = await Rol.create({
        nombre
      });
  
      res.status(201).json(newRol);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = app;
