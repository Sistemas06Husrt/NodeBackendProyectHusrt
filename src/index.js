const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./../routes/usuarioRoutes');
const rolRoutes = require('./../routes/rolRoutes');

const {checkToken} =  require('./../utilities/middleware');
const sequelize = require('./../config/configDb');

//settings
app.set('port', 3005);
app.listen(3005, '0.0.0.0')
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(rolRoutes);
app.use(usuarioRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => console.log('Error:', err));