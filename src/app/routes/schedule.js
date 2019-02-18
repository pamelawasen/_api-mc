const express = require('express');
const scheduleModel = require('../models/schedule');

const router = express.Router();



module.exports = app => app.use('/', router); 