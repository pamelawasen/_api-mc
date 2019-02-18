const express = require('express');
const priceListModel = require('../models/priceList');

const router = express.Router();

// Criar Lista de Preço
router.post('/create/priceList', async (req, res) => {

    const {description} = req.body;

    try{
        if( await priceListModel.findOne({'description': description}) )
        return res.status(400).send('Lista já cadastrada!')

        const list = await priceListModel.create(req.body);
        return res.status(200).send(list);
    }

    catch(err){

    }
})

// Ler Lista de Preço Ativa
router.post('/read/priceList', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await priceListModel.findOne({_id,deleted:false}))
        return res.status(400).send('Lista não encontrado!')

        const list = await priceListModel.findOne({_id,deleted:false})
        return res.status(200).send(list);
    }

    catch(err){

    }
})

// Ler Lista de Preço Deletada
router.post('/readDel/priceList', async (req, res) =>{
    var del = await priceListModel.find({deleted:true}) 

    try{
        if( del.length == 0 )
        return res.status(400).send('Não há lista deletada!')

        const list = await priceListModel.find({deleted:true})
        return res.status(200).send(list)
    }

    catch(err){

    }

})


// Alterar Lista de Preço
router.put('/update/priceList', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await priceListModel.findOne({_id,deleted:false}))
        return res.status(400).send('Lista não encontrada!')

        await priceListModel.updateOne({_id}, {
            $set: req.body
        })
        return res.status(200).send('Lista alterada!')
    }

    catch(err){

    }
})

// Deletar Lista de Preço
router.put('/delete/priceList', async (req, res) => {
    var {_id} = req.body;

    try{
        if( !await priceListModel.findOne({_id,deleted:false}))
        return res.status(400).send('Lista não encontrada!')

        await priceListModel.updateOne({_id}, {
            $set: {deleted:true}
        })
        return res.status(200).send('Lista deletada!')
    }

    catch(err){

    }
})

module.exports = app => app.use('/', router);