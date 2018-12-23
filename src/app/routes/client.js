const express = require('express');
const clientModel = require('../models/client');


const router = express.Router();

router.post('/create/client', async (req, res) => {
    //desestruturação no req.body
    const { email, cpf } = req.body;
    
    try{
        //verifica se existe usuario com mesmo cpf no banco
        if( await clientModel.findOne({'cpf': cpf}) )
           return res.status(400).send('CPF já cadastrado.'); //caso tenha o mesmo cpf no banco envia msg de erro e codigo 400
        
        //cria o cliente com os dados enviados pelo req.body
        const user = await clientModel.create(req.body);
        //retorna status 200 e o client criado
        return res.status(200).send(user);

    }
    catch(err){
        //aqui vamos validar os erros

    }
})

module.exports = app => app.use('/', router); 