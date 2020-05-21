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
            res.status(201).json(acct);
        }
    }
    catch(err){
            res.status(500).json({message:"there was an error in posting"})
        }  
})

module.exports = router;