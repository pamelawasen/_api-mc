const express = require('express');
const clientModel = require('../models/client');

const router = express.Router();


/*
* Rota para criaçao de um novo client
*/
router.put('/create/client', async (req, res) => {
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

/*
* Rota para alterar um client
*/
router.post('/update/client', async (req, res) => {
    //desestruturação no req.body
    var { _id } = req.body;
    
    try {
        //verifica se existe um usuario com o id passado
        if( !await clientModel.findById(_id) )
            return res.status(400).send('Usuario não encontrado');//caso nao existe manda msg de erro      

        //localiza e faz update do cliente
        await clientModel.findOneAndUpdate(_id, { 
            $set: req.body 
        })
        return res.status(200).send('ok')

    }
    catch(err){
        //aqui vamos validar os erros

    }
})

/*
* Rota para deletar um  client
*/
router.delete('/delete/client/:_id', async (req, res) => {
    //desestruturação no req.params
    var { _id } = req.params;
    
    try {
        //verifica se existe um usuario com o id passado
        if( !await clientModel.findById(_id) )
            return res.status(400).send('Usuario não encontrado');//caso nao existe manda msg de erro      

        //localiza e faz delete do cliente
        await clientModel.findByIdAndDelete(_id)
        return res.status(200).send('deletado')

    }
    catch(err){
        //aqui vamos validar os erros

    }
})

module.exports = app => app.use('/', router); 