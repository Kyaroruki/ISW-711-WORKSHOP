require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');   
const mongoose = require('mongoose');

const app = express();                

const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL;

/* Middlewares */
app.use(express.json());
app.use('/api', routes);

/* MongoDB */
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

/* Server */
app.listen(3000, () => {
    console.log('Server Started at 3000');
});