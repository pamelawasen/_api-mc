const express = require('express');
const router = express.Router();

const adminModel = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');

router.put('/create/admin', async (req, res) => {
 
    try {

        const { email, password } = req.body;

        if(await adminModel.findOne({ email }))
            return res.status(400).send('Email já em uso')

        //cria um hash da senha do admin
        var hash = await bcrypt.hashSync(password);
        
        req.body.password = hash;
    
        await adminModel.create(req.body);
        return res.status(200).send(`${req.body.name} criado com sucesso`);

    }
    catch(err) {
        console.log(err);
    }
    
})

module.exports = app => app.use('/', router); 