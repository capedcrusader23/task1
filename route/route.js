const express=require('express');
const router=express.Router();
const ifsc=require('./file');
const body=require('body-parser');
var url=body.urlencoded({extended:false});
router.get('/',function(req,res){
  res.render("home");
})

router.post('/check',url,function(req,res) {
    var k = ifsc.fetchDetails(req.body.ifsc);
    if (k ==undefined) {
        res.redirect('/error');
    }
    else {

        res.render('fnd',{info:k});
    }
});

router.get("/error",url,function(req,res){
    res.render('error');
});



module.exports=router;