var express = require('express');
const nocache = require('nocache');
var router = express.Router();
const customerController=require('../controller/customerController');
const Customer = require('../models/customer');
const { adminAuthentication } = require('../middleware/adminMiddleware');

// Route to home


//router for error
router.get('/error',(req,res)=>{
    res.status(404).send("Wrong credentials. Please try again");
});


//router for dashboard
router.get('/dashboard',adminAuthentication, async(req, res) => {
    const customers=await Customer.find({}).lean().exec();
        res.render('dashboard', {customers});
});



// router.get('/edit/:id', async(req, res)=>{
//     // try{
//     //     const customer=await Customer.find({_id:req.params.id});
//     //     const locals={
//     //         title: 'Edit customer data',
//     //         description:'Nodejs user management system'
//     //     };
//     //     res.render('/customer/edit',{
//     //         locals,
//     //         customer
//     //     })
//     // }catch(error){
//     //     console.log(error);
//     // }
//     res.render('customer/edit')
// })

// router.post('/edit/:id', (req,res)=>{
//     res.redirect('/edit')
// })

//router for customers
router.get('/', adminAuthentication, customerController.homepage);
router.get('/add',adminAuthentication, customerController.addCustomer);
router.post('/add',adminAuthentication, customerController.postCustomer);
router.get('/edit/:id',adminAuthentication, customerController.edit);
router.post('/edit/:id',adminAuthentication,  customerController.editPost);
router.get('/delete/:id', adminAuthentication, customerController.deleteCustomer);
router.post('/search',adminAuthentication, customerController.searchCustomer);

module.exports = router;