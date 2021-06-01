const mongoose = require('mongoose')


console.log("Connecting..");

const password="devguy"

const url = `mongodb+srv://dev-sps:${password}@cluster0.e91lg.mongodb.net/movie_db?retryWrites=true&w=majority`

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true, useFindAndModify:false}).then(res=>{
    console.log("Connected")
}).catch(error=()=>{
    console.log("Error connecting: ", error.message)
})

const movieScheama = new mongoose.Schema({
    name:String,
    rating:Number
})


movieScheama.set('toJSON',{
    transform: (document,result)=>{
        result.id=result._id.toString()
        delete result._id
        delete result.__v
    }
})

module.exports = mongoose.model('Movie',movieScheama)