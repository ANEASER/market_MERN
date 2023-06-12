require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({credentials:true, origin:'http://localhost:3000'})); 
app.use(bodyParser.json());
app.use(cookieParser());


const URL = process.env.MONGODB_URL;

PORT = 4000;

mongoose.connect(
    URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    });

const connection = mongoose.connection;
    connection.once("open", () => {
        console.log("Monodb Connection Success!"); // if the connection opened run this function
    })

try { app.listen(PORT, ()=>{
        console.log(`PORT is up ${PORT}`); // if the port opened run this function
    })} catch { (err) =>
        console.log(err);
    }


const userrouter  = require('./routes/userroutes.js');

app.use('/market/user', userrouter);