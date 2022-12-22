const express = require('express');
const con = require('./Modal/Connection')
const app = express();
const cors = require('cors')
const Port = 8000;
app.use(express.json())
app.use(cors())

const docter = require('./Routes/Docter.Routes')
app.use('/', docter)

const prescription = require('./Routes/Prescription.routes')
app.use('/', prescription) 

const medicine = require('./Routes/prescribed_medicine')
app.use('/', medicine) 


app.listen(Port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`server is started on http://localhost:${Port} Port...`)
})