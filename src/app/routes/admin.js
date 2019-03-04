const express = require('express');
const router = express.Router();

const adminModel = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');

router.post('/create/admin', async (req, res) => {
 
    try {

        const { email, password } = req.body;

        if(await adminModel.findOne({ email }))
            return res.status(400).send('Email já em uso')

        //cria um hash da senha do admin
        var hash = await bcrypt.hashSync(password);
        
        req.body.password = hash;
    
        await adminModel.create(req.body);
        return res.status(200).send(`${req.body.name} criado com sucesso`);

    }
    catch(err) {
        console.log(err);
    }
    
})


router.put('/update/admin', async (req, res) => {

    try {
        const { _id, password } = req.body;
        
        //verifica se existe um admin com o id passado
        if( !await adminModel.findById(_id) )
            return res.status(400).send('Admin não encontrado');//caso nao existe manda msg de erro      

        //gera um hash para senha do usuario
        var hash = await bcrypt.hashSync(password);
        req.body.password = hash;

        //localiza e faz update do cliente
        await adminModel.findOneAndUpdate(_id, { 
            $set: req.body 
        })
        return res.status(200).send('ok')
    }
    catch(err){

    }
})

/*
* Rota para trazer os admins
 */
router.get('/get/admin', async(req, res) => {
    try{
        
        const admins = await adminModel.find();
        if(admins)
            return res.status(200).send(admins);
    }   
    catch(err){

    }
})


/*
* Rota para trazer o admin com respectivo ID
 */
router.get('/get/admin/:_id', async(req, res) => {
    try{
        
        const _id = req.params

        const admin = await adminModel.findById(_id);
        if(admin)
            return res.status(200).send(admin);
    }   
    catch(err){

    }
})


/*
* Rota para deletar o admin com respectivo ID
 */
router.delete('/delete/admin/:_id', async(req, res) => {
    try{
        
        const _id = req.params

        const admin = await adminModel.findByIdAndDelete(_id);
        
        if(!admin)
            return res.status(404).send('Usuário não encontrado!');    

        return res.status(200).send(`${admin.name} deleted.`);
    }   
    catch(err){
        console.log(err)
        return res.status(400).send(err);
    }
})

module.exports = app => app.use('/', router); 