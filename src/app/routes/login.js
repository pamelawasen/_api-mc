const express = require('express');
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
const transporter = require('../email.config');
const randomString = require('randomstring');

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


/** 
 * Rota para envio de uma nova senha caso usuario solicite
 */
router.post('/lost/password', async (req, res) => {
    const newPassword = randomString.generate(15);//gera um novo password
    
    try {
        const {email} = req.body;

        if( !await adminModel.findOne({  email }) )
            return res.status(400).send({error: 'Email não cadastrado'});

        //gera um hash do novo password
        var hash = await bcrypt.hashSync(newPassword);

        //acha o admin e muda seu password
        await adminModel.findOneAndUpdate(email ,{$set:{password: hash}}, {new: true}).exec();
      
        //enviar email
        var mailOptions = {
            from: 'vidracariamc1@gmail.com',
            to: email,
            subject: 'teste',
            text: 'nova senha ' + newPassword
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
               return res.status(200).send(`Emai sent to ${email}`);
            }
        }); 
    }
    catch(err){
        res.send(err)
    }
})


module.exports = app => app.use('/', router);