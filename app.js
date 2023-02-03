const bodyParser = require('body-parser');
const express=require('express');
const feedRoutes=require('./routes/feed');
const mongoose=require('mongoose')
const path=require('path')
const mongoUrl=require('./config')


const app=express();
//app.use(bodyParser.urlencoded())  // Html pages formdata
app.use(bodyParser.json())
app.use('/images',express.static(path.join(__dirname,'/images')))
app.use('/feed',feedRoutes)
app.use((error,req,res,next)=>{
    console.log(error)
    const status=error.statusCode||500
    const message=error.message
    res.status(status).json({message:message})

})

mongoose.connect(mongoUrl)
.then((result)=>{
    app.listen(8080,()=>{
        console.log('running')
    
    })


})
.catch((err)=>{
    console.log(err)
})

