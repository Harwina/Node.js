const express  =require('express');

const routes = express.Router();

routes.use('/crud',require('./crudRoute'));

module.exports= routes;