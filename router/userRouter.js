var express = require('express');
var userRouter = express.Router();
const customerController=require('../controller/customerController');
const Customer = require('../models/customer');
const adminSchema = require('../models/adminSchema');
const { userAuthentication } = require('../middleware/authMiddleware');
const customer = require('../models/customer');

//userRouter for login user
userRouter.post('/login',async (req, res) => {
    let email=req.body.email
    let passowrd=req.body.password

    const user=await customer.findOne({email:email});
    if(user){
        console.log('user is ere',user);
    }else{
console.log(req.body);
const admin=await adminSchema.findOne({email:email})
        if (admin) { 

            console.log('adim ',admin);//storing cookie
            if(admin.password!=passowrd) return res.render('base',{message:'Your password is incorrect'})

            req.session.admin = admin.email;
            res.redirect('/admin/dashboard');
        } else {
            res.render('base',{message:'Your not authenticated'})
            // res.redirect("/admin/error");
        }
    }
});


userRouter.get('/',userAuthentication, (req, res) => {
        res.render('base');
})

//router for logout
userRouter.post('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.redirect('/');
        }
    })
})

userRouter.post('/signup',async(req,res)=>{
    console.log('signupfhhds');
    console.log(req.body);
    if(req.body.email==="admin@gmail.com"){
        res.render('signup',{message:"Invalid email id"});
    }else{
        await customer.create(req.body);
        req.session.user=req.body.email;
        res.redirect('/userHome');
    }
})
 
//userRouter for signup
userRouter.get('/signup',(req,res)=>{
    console.log('it s get');
    res.render('signup')
})


userRouter.get('/userHome',userAuthentication,async(req,res)=>{
    res.render('userdash');
})


module.exports= userRouter;