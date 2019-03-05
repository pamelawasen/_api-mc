const express = require('express');
const orderModel = require('../models/order');

const router = express.Router();

// Criar Pedido
router.post('/create/order', async (req, res) => {

    try{ const order = await orderModel.create(req.body);
        return res.status(200).send(order);
    }

    catch(err){

    }
})

// Ler Pedido Ativo
router.post('/read/order', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await orderModel.findOne({_id,deleted:false}))
        return res.status(400).send('Pedido não encontrado!')

        const order = await orderModel.findOne({_id,deleted:false})
        return res.status(200).send(order);
    }

    catch(err){

    }
})

// Ler Pedido Deletado
router.post('/readDel/order', async (req, res) =>{
    var del = await orderModel.find({deleted:true}) 

    try{
        if( del.length == 0 )
        return res.status(400).send('Não há pedido deletado!')

        const order = await orderModel.find({deleted:true})
        return res.status(200).send(order)
    }

    catch(err){

    }

})


// Alterar Pedido
router.put('/update/order', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await orderModel.findOne({_id,deleted:false}))
        return res.status(400).send('Pedido não encontrado!')

        await orderModel.updateOne({_id}, {
            $set: req.body
        })
        return res.status(200).send('Pedido alterado!')
    }

    catch(err){

    }
})

// Deletar Pedido
router.put('/delete/order', async (req, res) => {
    var {_id} = req.body;

    try{
        if( !await orderModel.findOne({_id,deleted:false}))
        return res.status(400).send('Pedido não encontrado!')

        await orderModel.updateOne({_id}, {
            $set: {deleted:true}
        })
        return res.status(200).send('Pedido deletado!')
    }

    catch(err){

    }
})

module.exports = app => app.use('/', router);