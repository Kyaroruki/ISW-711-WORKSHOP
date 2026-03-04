const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const { authenticateToken, generateToken, register } = require('/controllers/Auth.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/worskshop-03');
const database = mongoose.connection; //Guardar conexion


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express(); //crear servidor

app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// auth routes
app.post('/auth/register', register);
app.post('/auth/token', generateToken);

//routes
app.use('/api', authenticateToken, require('./routes/couseRoutes'));
app.use('/api', authenticateToken, require('./routes/professorRoutes'));


//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))