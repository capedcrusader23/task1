const express=require('express');
const router=express.Router();
const ifsc=require('./file');
const body=require('body-parser');
var url=body.urlencoded({extended:false});
var https=require('https');
router.get('/',function(req,res){
  res.render("home");
})

router.post('/check',url,function(req,response) {
 var k='https://ifsc.razorpay.com/'+req.body.ifsc;

 
    https.get(k, function(res){
        var data='';

        res.on('data', function(chunk){
            data += chunk;
        });


        res.on('end', function(){
            if(data.match('Not Found')){
                response.redirect('/error');
            }
            else {
                var result = JSON.parse(data);
                response.render('fnd',{info:result});
            }
        });
    }).on('error', function(e){
        console.log(e);
    });
});


router.get("/error",url,function(req,res){
    res.render('error');
});

module.exports=router;
