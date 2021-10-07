const {Schema,model}=require('mongoose');

const carSchema=new Schema({
    brand:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    model:{
        type:String,
        required:true,
        trim:true
    },

    year:{
        type:Number,
        required:true
    },

    price:{
        type:Number,
        required:true
    }
});


module.exports=model('car',carSchema);
