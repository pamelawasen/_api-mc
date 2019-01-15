const express = require('express');
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

router.post('/login', async (req, res) => {
    
    var { email, password } = req.body;
    var admin = await adminModel.findOne({ email }); 
    
    if(!admin)
        return res.status(400).send('Email ou senha incorreto.')
    
    if( bcrypt.compare( admin.password )){
        
    }
    
    
    
})