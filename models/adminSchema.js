const mongoose=require('mongoose');

//creating a schema
const Schema=mongoose.Schema;
const adminSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model('admin',adminSchema);