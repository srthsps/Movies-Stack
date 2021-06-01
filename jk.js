const express= require('express')
const app =express()
const cors = require('cors')
const { response } = require('express')

app.use(express())
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Help")
    console.log("Get received");
})

app.post('/',(req,res)=>{
    const log= req.body
    res.send("Received")
    console.log("POST Received");
})

