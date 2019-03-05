const express = require('express');
const scheduleModel = require('../models/schedule');

const router = express.Router();

// Criar Agendamento
router.post('/create/schedule', async (req, res) => {

    const {_id,id_order} = req.body;

    try{
        if( await scheduleModel.findOne({_id:_id, id_order:id_order}) )
        return res.status(400).send('Agendamento já cadastrado!')

        const schedule = await scheduleModel.create(req.body);
        return res.status(200).send(schedule);
    }

    catch(err){

    }
})

// Ler Agendamento Individuais Ativo
router.post('/readOne/schedule', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await scheduleModel.findOne({_id,deleted:false}))
        return res.status(400).send('Agendamento não encontrado!')

        const schedule = await scheduleModel.findOne({_id,deleted:false})
        return res.status(200).send(schedule)
    }

    catch(err){

    }
})

// Ler Todos Agendamento Ativo
router.post('/read/schedule', async (req, res) =>{

    try{
        if( !await scheduleModel.find({deleted:false}))
        return res.status(400).send('Agendamentos não encontrados!')

        const schedule = await scheduleModel.find({deleted:false})
        return res.status(200).send(schedule)
    }

    catch(err){

    }
})


// Ler Agendamento Deletado
router.post('/readDel/schedule', async (req, res) =>{
    var del = await scheduleModel.find({deleted:true}) 

    try{
        if( del.length == 0 )
        return res.status(400).send('Não há agendamento deletado!')

        const schedule = await scheduleModel.find({deleted:true})
        return res.status(200).send(schedule)
    }

    catch(err){

    }
})


// Alterar Agendamento
router.put('/update/schedule', async (req, res) =>{
    var {_id} = req.body;

    try{
        if( !await scheduleModel.findOne({_id,deleted:false}))
        return res.status(400).send('Agendamento não encontrado!')

        await scheduleModel.updateOne({_id}, {
            $set: req.body
        })
        return res.status(200).send('Agendamento alterado!')
    }

    catch(err){

    }
})

// Deletar Agendamento
router.put('/delete/schedule', async (req, res) => {
    var {_id} = req.body;

    try{
        if( !await scheduleModel.findOne({_id,deleted:false}))
        return res.status(400).send('Agendamento não encontrado!')

        await scheduleModel.updateOne({_id}, {
            $set: {deleted:true}
        })
        return res.status(200).send('Agendamento deletado!')
    }

    catch(err){

    }
})

module.exports = app => app.use('/', router); 