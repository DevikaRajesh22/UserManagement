const Customer=require('../models/customer');
const mongoose=require('mongoose');

// homepage
exports.homepage=async (req,res)=>{
    const messages=await req.consumeFlash('info');
        const locals={
            title: 'NodeJs',
            description:'Nodejs user management system'
        }
        let perPage=12;
        let page=req.query.page||1;
        try{
            const customers=await Customer.find({}).lean().exec();
            console.log(customers);
            res.render('base',{ locals, messages, customers });
        }catch(error){
            console.log(error);
        }
}


// exports.homepage=async (req,res)=>{
//     const messages=await req.consumeFlash('info');
//         const locals={
//             title: 'NodeJs',
//             description:'Nodejs user management system'
//         }
//         let perPage=12;
//         let page=req.query.page||1;
//         try{
//             const customers=await Customer.aggregate([{$sort:{updatedAt: -1}}])
//             .skip(perPage * page - perPage)
//             .limit(perPage)
//             .exec();
//             const count=await Customer.count();
//             res.render('dashboard',{
//                 locals,
//                 customers,
//                 current:page,
//                 pages:Math.ceil(count/perPage),
//                 messages
//             }); 
//         }catch(error){
//             console.log(error);
//         }
// }


//new customer form GET
exports.addCustomer=async (req,res)=>{
        const locals={
            title: 'Add new customer - NodeJs',
            description:'Nodejs user management system'
        }
        res.render('customer/add',locals);
}

//create new customer form POST
exports.postCustomer=async (req,res)=>{
    console.log(req.body);
    const newCustomer=new Customer({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        userName:req.body.uname,
        number:req.body.number,
        email:req.body.email,
        password:req.body.password,
    });
    try{
        await Customer.create(newCustomer);
        await req.flash('info','New customer has been added');
        res.redirect('/');
    }catch(error){
        console.log(error);
    }
}

//GET customer data
exports.view=async(req,res)=>{
    try{
        const customer=await Customer.findOne({_id:req.params.id});
        const locals={
            title: 'View customer data',
            description:'Nodejs user management system'
        };
        res.render('/customer/view',{
            locals,
            customer
        })
    }catch(error){
        console.log(error);
    }
}

//POST edit customer data
exports.edit=async(req,res)=>{
    try{
        const customer=await Customer.findOne({_id:req.params.id});
        const locals={
            title: 'Edit customer data',
            description:'Nodejs user management system'
        };
        console.log(customer)
        res.render('customer/edit',{
            locals,
            customer,
            title:locals.title
        })
    }catch(error){
        console.log(error);
    }
}

//POST update customer data
exports.editPost=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {firstname,lastname,email,number,uname}=req.body;
       const result = await Customer.updateOne({_id:userId},{
            firstName:firstname,
            lastName:lastname,
            email:email,
            number:number,
            userName:uname,
        });
        console.log(result,7676);
        res.redirect(`/admin/dashboard`);
    }catch(error){
        console.log(error);
    }
}

//delete customer data
exports.deleteCustomer=async(req,res)=>{
   try{
    console.log(req.params.id);
    await Customer.deleteOne({_id:req.params.id});
    res.redirect("/admin/dashboard");
   }catch(error){
    console.log(error);
   }
}


//get search customer data
exports.searchCustomer=async(req,res)=>{
    const locals={
        title: 'Search customer data',
        description:'Nodejs user management system'
    };
    try {
        let searchTerm=req.body.searchTerm;
        // const searchNoSpecialChar=RegExp(/[^a-zA-Z0-9]/g,"");
        const customers=await Customer.find({
            $or:[
                {firstName:{$regex: new RegExp(searchTerm,"i")}},
                {lastName:{$regex: new RegExp(searchTerm,"i")}}
            ]
        });
        console.log(customers);
        res.render("search",{
            customers,
            locals
        })
    } catch (error) {
        console.log(error)
    }
 }
 
