const express = require("express");
const router = require('./router.js');
// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/accounts', router);

server.get('/', (req,res)=>{
    res.status(200).json({message:"api is running"})
})

module.exports = server;
