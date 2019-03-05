const express = require('express');
const paymentFormModel = require('../models/paymentForm');

const router = express.Router();

// Criar Forma de Pagamento
router.post('/create/paymentForm', async (req, res) => {

    const {description} = req.body;

    try{
        if( await paymentFormModel.findOne({'description': description}) )
        return res.status(400).send('Forma já cadastrada!')

        const form = await paymentFormModel.create(req.body);
        return res.status(200).send(form);
    }

    catch(err){

    }
})

// Ler Forma de Pagamento Ativa
router.post('/read/paymentForm', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await paymentFormModel.findOne({_id,deleted:false}))
        return res.status(400).send('Forma não encontrado!')

        const form = await paymentFormModel.findOne({_id,deleted:false})
        return res.status(200).send(form);
    }

    catch(err){

    }
})

// Ler Forma de Pagamento Deletada
router.post('/readDel/paymentForm', async (req, res) =>{
    var del = await paymentFormModel.find({deleted:true}) 

    try{
        if( del.length == 0 )
        return res.status(400).send('Não há forma deletada!')

        const form = await paymentFormModel.find({deleted:true})
        return res.status(200).send(form)
    }

    catch(err){

    }

})


// Alterar Lista de Preço
router.put('/update/paymentForm', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await paymentFormModel.findOne({_id,deleted:false}))
        return res.status(400).send('Forma não encontrada!')

        await paymentFormModel.updateOne({_id}, {
            $set: req.body
        })
        return res.status(200).send('Forma alterada!')
    }

    catch(err){

    }
})

// Deletar Lista de Preço
router.put('/delete/paymentForm', async (req, res) => {
    var {_id} = req.body;

    try{
        if( !await paymentFormModel.findOne({_id,deleted:false}))
        return res.status(400).send('Forma não encontrada!')

        await paymentFormModel.updateOne({_id}, {
            $set: {deleted:true}
        })
        return res.status(200).send('Forma deletada!')
    }

    catch(err){

    }
})

module.exports = app => app.use('/', router);