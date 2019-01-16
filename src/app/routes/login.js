const express = require('express');
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

router.post('/login', async (req, res) => {
    
    try {
        var { email, password } = req.body;

        var admin = await adminModel.findOne({ email }); 
    
        if(!admin)
            return res.status(400).send('Email ou senha incorreto.')
        
        if( !bcrypt.compareSync( password, admin.password  ))
            return res.status(400).send('password invalido')
        
        return res.status(200).send(admin);
    
    }
    catch(err){

    }
    
})

module.exports = app => app.use('/', router);