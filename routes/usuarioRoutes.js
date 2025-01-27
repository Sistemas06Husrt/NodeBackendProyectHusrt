const Usuario = require('../models/Usuario');
const { Router } = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {checkToken} =  require('../utilities/middleware');
const app = Router();

const SECRET_KEY = 'aPPHusRT2024';

app.post('/adduser', async (req, res) => {
    try {
      const { nombres, apellidos, nombreUsuario, tipoId, numeroId, telefono, email, contrasena, registroInvima, estado, rolId } = req.body;
      const contraseña = await bcrypt.hash(contrasena, 10);
      const nuevoUsuario = await Usuario.create({
        nombres,
        apellidos,
        nombreUsuario, 
        tipoId, 
        numeroId, 
        telefono, 
        email, 
        contraseña, 
        registroInvima, 
        estado, 
        rolId
      });
  
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  app.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
  
    try {
      const usuario = await Usuario.findOne({ where: { email }, include: 'rol'});
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña Incorrecta' });
      }
  
      if(usuario.estado){
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol.nombre }, SECRET_KEY, { expiresIn: '1h' });  
        res.json({ 
          token: token,
          idUser: usuario.id
         });
      }else{
        return res.status(404).json({ error: 'Usuario Inactivo' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  app.get('/users', checkToken, async (req, res) => {
    try {
      const users = await Usuario.findAll({ include: 'rol' });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/user/:id', async (req, res) => {
    try {
      const user = await Usuario.findByPk(req.params.id, { include: 'rol' });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


app.get('/users/username/:nombreUsuario', async (req, res) => {
  try {
    const user = await Usuario.findOne({
      where: { nombreUsuario: req.params.nombreUsuario},
      include: 'rol'
    });
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario No Encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/users/update/:id', checkToken, async (req, res) => {
  const { nombres, apellidos, nombreUsuario, tipoId, numeroId, telefono, email, contraseña, registroInvima, estado, rolId } = req.body;
  const hashedPassword = contraseña ? await bcrypt.hash(contraseña, 10) : undefined;

  try {
    const user = await Usuario.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no Encontrado' });
    }

    await user.update({
      nombres: nombres || user.nombres,
      apellidos: apellidos || user.apellidos,
      nombreUsuario: nombreUsuario || user.nombreUsuario,
      tipoId: tipoId || user.tipoId,
      numeroId: numeroId || user.numeroId,
      telefono: telefono || user.telefono,
      email: email || user.email,
      contraseña: hashedPassword || user.contraseña,
      registroInvima: registroInvima || user.registroInvima,
      estado: estado !== undefined ? estado : user.estado,
      RolId: rolId || user.RolId
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

  module.exports = app;