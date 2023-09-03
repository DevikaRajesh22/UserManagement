const mongoose=require('mongoose');

//creating a schema
const Schema=mongoose.Schema;
const customerSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model('customer',customerSchema);