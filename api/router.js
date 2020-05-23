const express = require ('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const accounts = await db.select('*').from('accounts');
        res.status(200).json(accounts);
    } catch(err){
        res.status(500).json({message:"error in retrieving accounts"})
    }
})

router.get('/:id', async (req, res) =>{
    const {id} = req.params;
    try{
        const acct = await db.select("*").from('accounts').where('id',id).first();
            if(acct){
                res.status(200).json(acct);
            }else
            {
                res.status(400).json({message:"account not found"});
            }
    }catch(err){
        res.status(500).json({message:"error in retrieving account"});
    }
})

router.post('/', async (req,res)=>{
    const acctDat = req.body;
    try{
        if(!acctDat){
            res.status(400).json({message:"this post request needs a body"})
        }else if(!acctDat.name){
            res.status(400).json({message:"this post needs a name"})
        }else if(!acctDat.budget){
            res.status(400).json({message:"this post needs a budget"})
        }else{
            const acct = await db('accounts').insert({name: acctDat.name, budget: acctDat.budget});
            res.status(201).json({name: acctDat.name, budget: acctDat.budget});
        }
    }
    catch(err){
            res.status(500).json({message:"there was an error in posting"})
        }  
})

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const acctDat = req.body;
    try{
        if(!acctDat){
            res.status(400).json({message:"this post request needs a body"})
        }else if(!acctDat.name){
            res.status(400).json({message:"this post needs a name"})
        }else if(!acctDat.budget){
            res.status(400).json({message:"this post needs a budget"})
        }else{
            await db('accounts').where('id',id).update({name: acctDat.name, budget: acctDat.budget},['id','name','budget']);
            res.status(201).json({message:"update successful"});
        }
    }
    catch(err){
            res.status(500).json({message:"there was an error in posting"})
        }  
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    try{
        if(!id){
            res.status(404).json({message:"no account with this id found"})
        }else{
        await db('accounts').where('id',id).del();
        res.status(204).json({})
        }
    }
    catch(err){
        res.status(500).json({message:"there was an error in deleting the account"});
    }
})
module.exports = router;