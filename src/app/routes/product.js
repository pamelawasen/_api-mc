const express = require('express');
const productModel = require('../models/product');

const router = express.Router();

// Criar Produto
router.post('/create/product', async (req, res) => {

    const {description,provider} = req.body;

    try{
        if( await productModel.findOne({'description': description,'provider':provider}) )
        return res.status(400).send('Produto já cadastrado!')

        const product = await productModel.create(req.body);
        return res.status(200).send(product);
    }

    catch(err){

    }
})

// Ler Todos Produto Ativo
router.post('/read/product', async (req, res) =>{

    try{
        if( !await productModel.find({deleted:false}))
        return res.status(400).send('Produtos não encontrados!')

        const product = await productModel.find({deleted:false})
        return res.status(200).send(product)
    }

    catch(err){

    }
})

// Ler Produto Individuais Ativo
router.post('/readOne/product', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await productModel.findOne({_id,deleted:false}))
        return res.status(400).send('Produto não encontrado!')

        const product = await productModel.findOne({_id,deleted:false})
        return res.status(200).send(product)
    }

    catch(err){

    }
})

// Ler Produto Deletado
router.post('/readDel/product', async (req, res) =>{
    var del = await productModel.find({deleted:true}) 

    try{
        if( del.length == 0 )
        return res.status(400).send('Não há produto deletado!')

        const product = await productModel.find({deleted:true})
        return res.status(200).send(product)
    }

    catch(err){

    }
})


// Alterar Produto
router.put('/update/product', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await productModel.findOne({_id,deleted:false}))
        return res.status(400).send('Produto não encontrado!')

        await productModel.updateOne({_id}, {
            $set: req.body
        })
        return res.status(200).send('Produto alterado!')
    }

    catch(err){

    }
})

// Deletar Produto
router.put('/delete/product', async (req, res) => {
    var {_id} = req.body;

    try{
        if( !await productModel.findOne({_id,deleted:false}))
        return res.status(400).send('Produto não encontrado!')

        await productModel.updateOne({_id}, {
            $set: {deleted:true}
        })
        return res.status(200).send('Produto deletado!')
    }

    catch(err){

    }
})

module.exports = app => app.use('/', router);