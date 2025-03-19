const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./../routes/general/usuarioRoutes');
const rolRoutes = require('./../routes/general/rolRoutes');
const servicios = require('./../routes/general/servicioRoutes');
const tipoDocumento = require('./../routes/general/tipoDocumentoRoutes');
const documentoRoutes = require('./../routes/general/documentoRoutes');
const tipoEquipos = require('./../routes/biomedica/tipoEquipoRoutes');
const equipo = require('./../routes/biomedica/equipoRoutes');
const hojaVida = require('./../routes/biomedica/hojaVidaRoutes');
const sede = require('./../routes/general/sedeRoutes');
const responsable = require('./../routes/biomedica/responsableRoutes');


const {checkToken} =  require('./../utilities/middleware');
const sequelize = require('./../config/configDb');


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(rolRoutes);
app.use(usuarioRoutes);

app.use(servicios, checkToken);
app.use(tipoDocumento, checkToken);
app.use(documentoRoutes, checkToken);
app.use(tipoEquipos, checkToken);
app.use(hojaVida, checkToken);
app.use(equipo, checkToken);
app.use(sede, checkToken);
app.use(responsable, checkToken);

sequelize.sync()
  .then(() => {
    app.listen(3005,'0.0.0.0', () => {
      console.log('Server is running on http://localhost:3005');
    });
  })
  .catch(err => console.log('Error:', err));