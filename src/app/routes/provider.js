const express = require('express');
const providerModel = require('../models/provider');

const router = express.Router();


/*
* Rota para criaçao de um novo fornecedor
*/
router.post('/create/provider', async (req, res) => {
    //desestruturação no req.body
    const { email, cnpj } = req.body;
    
    try{
        //verifica se existe fornecedor com mesmo cnpj no banco
        if( await providerModel.findOne({'cnpj': cnpj}) )
           return res.status(400).send('CNPJ já cadastrado.'); //caso tenha o mesmo cnpj no banco envia msg de erro e codigo 400
        
        //cria o fornecedor com os dados enviados pelo req.body
        const provider = await providerModel.create(req.body);
        //retorna status 200 e o fornecedor criado
        return res.status(200).send(provider);

    }
    catch(err){
        //aqui vamos validar os erros

    }
})

/*
* Rota para alterar um fornecedor
*/
router.put('/update/provider', async (req, res) => {
    //desestruturação no req.body
    var { _id } = req.body;
    
    try {
        //verifica se existe um fornecedor com o id passado
        if( !await providerModel.findById(_id) )
            return res.status(400).send('Fornecedor não encontrado');//caso nao existe manda msg de erro      

        //localiza e faz update do fornecedor
        await providerModel.findOneAndUpdate(_id, { 
            $set: req.body 
        })
        return res.status(200).send('ok')

    }
    catch(err){
        //aqui vamos validar os erros

    }
})

/*
* Rota para deletar um  fornecedor
*/
router.delete('/delete/provider/:_id', async (req, res) => {
    //desestruturação no req.params
    var { _id } = req.params;
    
    try {
        //verifica se existe um fornecedor com o id passado
        if( !await providerModel.findById(_id) )
            return res.status(400).send('Fornecedor não encontrado');//caso nao existe manda msg de erro      

        //localiza e faz delete do fornecedor
        await providerModel.findByIdAndDelete(_id)
        return res.status(200).send('deletado')

    }
    catch(err){
        //aqui vamos validar os erros

    }
})

module.exports = app => app.use('/', router); 