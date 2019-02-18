const express = require('express');
const budgetModel = require('../models/budget');

const router = express.Router();

// Criar Orçamento
router.post('/create/budget', async (req, res) => {

    try{ const budget = await budgetModel.create(req.body);
        return res.status(200).send(budget);
    }

    catch(err){

    }
})

// Ler Orçamento Ativa
router.post('/read/budget', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await budgetModel.findOne({_id,deleted:false}))
        return res.status(400).send('Orçamento não encontrado!')

        const budget = await budgetModel.findOne({_id,deleted:false})
        return res.status(200).send(budget);
    }

    catch(err){

    }
})

// Ler Orçamento Deletada
router.post('/readDel/budget', async (req, res) =>{
    var del = await budgetModel.find({deleted:true}) 

    try{
        if( del.length == 0 )
        return res.status(400).send('Não há orçamento deletado!')

        const budget = await budgetModel.find({deleted:true})
        return res.status(200).send(budget)
    }

    catch(err){

    }

})


// Alterar Orçamento
router.put('/update/budget', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await budgetModel.findOne({_id,deleted:false}))
        return res.status(400).send('Orçamento não encontrado!')

        await budgetModel.updateOne({_id}, {
            $set: req.body
        })
        return res.status(200).send('Orçamento alterado!')
    }

    catch(err){

    }
})

// Deletar Orçamento
router.put('/delete/budget', async (req, res) => {
    var {_id} = req.body;

    try{
        if( !await budgetModel.findOne({_id,deleted:false}))
        return res.status(400).send('Orçamento não encontrado!')

        await budgetModel.updateOne({_id}, {
            $set: {deleted:true}
        })
        return res.status(200).send('Orçamento deletado!')
    }

    catch(err){

    }
})

module.exports = app => app.use('/', router);