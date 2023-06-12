//const express = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {type : String,
                required : true,
                unique:true},

    password : {type : String,
                required : true,
                unique:false},

    email : {type : String,
                required : true,
                unique:true},
    
    firstname : {type : String,
                required : true,
                unique:false},

    lastname : {type : String,
                required : true,
                unique:false}
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;