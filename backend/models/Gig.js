const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    title :     {type : String,
                required : true,
                },
    
    seller : {type: mongoose.Schema.Types.ObjectId, ref:'User'},   

    tag :       {type : String,
                required : true,
                },

    price :     {type : Number,
                required : true,
                },
    
    description : {type : String,
                required : true,
                },

    cover : {type : String,
            required : true,
            unique:true
            }
})

const GigModel = mongoose.model('Gig', GigSchema);

module.exports = GigModel;