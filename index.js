const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { response } = require('express')
const Movie = require('./components/db_connection')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.post('/add/',async (req,res)=>{
    const name= req.body.name
    const rating= req.body.rating

    const movie = new Movie({
        name: name,
        rating: rating
    })
    try{
        await movie.save()
        res.send("Movie added")
    }
    catch(err){
        console.log(err);
    }
})

app.delete('/delete/:id',(req,res)=>{
    const dname=req.body.mname
    Movie.findByIdAndRemove(req.params.id).then(result=>{
        //res.status(204).end()
        res.send(result)
        console.log("Done");
    }).catch(error=>{
        res.status(error,"Invalid data")
        console.log("Not done",error);
    })
})



app.get('/data/',(req,res)=>{
 Movie.find({},(err,result)=>{
     if(err){
         res.send(err)
     }
     res.send(result)
 })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
  

app.listen(3001,()=>{
    console.log("Server activated...")
})