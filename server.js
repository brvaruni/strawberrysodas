const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.js');
const vehicleRoutes = require('./routes/vehicle.js');
const ParkRoutes = require('./routes/Parking.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = 9999;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/parking', ParkRoutes);
app.use('/', (req, res) => res.set('Access-Control-Allow-Origin', 'http://localhost:3000'));
app.get('/', (req, res) => res.send('hello from the other side'));

mongoose.connect('mongodb://localhost:27017/usersbackend')
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => console.log("App started successfully"));
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

app.listen(PORT,"localhost", () => console.log("App started successfully"));

