const fs = require('fs');
const Gig = require('../models/Gig')
const jwt = require('jsonwebtoken');
const secret = "asdad(&^(^swsfsfd";

const postGig = async (req,res,next) => {
    // rename file
    // grab the original name from the json request
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    // get logged user
    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info) => {// (token,secret,object,callback)
        if (err) throw err;
        const {title, tag, price,description} = req.body;   

        const postDoc = await Gig.create({
            title,
            tag,
            price,
            description,
            cover:newPath,
            seller: info.id,
        });

        res.json({postDoc});

      }); 
     
}

exports.postGig = postGig;