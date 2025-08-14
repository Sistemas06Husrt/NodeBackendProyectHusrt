const Usuario = require('../../models/generales/Usuario');
const { Router } = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkToken } = require('../../utilities/middleware');
const app = Router();
const transporter = require('../../utilities/mailer');
const generarPDF = require('../../utilities/crearPDF');

const SECRET_KEY = 'aPPHusRT2024';
const CLIENT_URL = 'http://172.30.40.201:4200/recuperarcontraseña';

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
  generarPDF();
  const { usuarion, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: { nombreUsuario: usuarion },
      include: 'rol'
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña Incorrecta' });
    }

    if (usuario.estado) {
      const token = jwt.sign({ id: usuario.id, rol: usuario.rol.nombre }, SECRET_KEY, { expiresIn: '1h' });
      res.json({
        token: token,
        idUser: usuario.id
      });

    } else {
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

app.get('/user/:id', checkToken, async (req, res) => {
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

app.get('/userprofil/:id', checkToken, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
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
      where: { nombreUsuario: req.params.nombreUsuario },
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


app.post('/olvidocontrasena', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '15m' });


    const link = `${CLIENT_URL}?token=${token}`;

    await transporter.sendMail({
      from: 'sistemas6@hospitalsanrafaeltunja.gov.co',
      to: email,
      subject: 'Recuperación de contraseña AppHusrt',
      html: `<p>Hola ${user.nombres},</p>
             <p>Solicitaste el cambio de contraseña de tu usuario de AppHusrt, Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${link}">${link}</a>
             <p>Este enlace expirará en 15 minutos.</p>`
    });

    res.json({ mensaje: 'Correo de recuperación enviado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar la solicitud', detalle: err.message });
  }
});


app.put('/cambiarcontrasena', checkToken, async (req, res) => {
  const { nuevaContrasena } = req.body;

  if (!req.headers['authorization']) {
    return res.json({ err: 'token no incluido' });
  }
  const token = req.headers['authorization'];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await Usuario.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const contraseña = await bcrypt.hash(nuevaContrasena, 10);
    user.contraseña = contraseña;
    await user.update({ contraseña: user.contraseña });
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Token inválido o expirado', detalle: err.message });
  }
});

app.get('/nombreusuario/:id', checkToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: ['nombres', 'apellidos', 'tipoId', 'numeroId']
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      nombreCompleto: `${usuario.nombres} ${usuario.apellidos}`,
      numeroId:  `${usuario.numeroId}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el nombre del usuario', detalle: error.message });
  }
});


module.exports = app;