const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json()); //para que express entienda los .json en el req.body.

//middlewares
app.use(cors({
  domains: '*',
  methods: '*'
}));

//routes
app.use('/professor', require('./app/Professor'));// Cuando se accede a http.. Express usa ./app/Professor.js
app.use('/course', require('./app/Courses')); //igual

//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))