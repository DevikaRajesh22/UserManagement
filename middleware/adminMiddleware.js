module.exports={
    adminAuthentication:(req,res,next)=>{
        console.log('on admin auht')
        if(req.session.admin){
            console.log('admin is here')
            next();
        }else{
            
            res.render('base');
        }
    }
}