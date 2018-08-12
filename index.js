const express=require('express');
const ejs=require('ejs');
const ifs=require('ifsc');
const route=require('./route/route')
const app=express();

app.use(route);
app.set('view engine','ejs');
app.use(express.static('views'));
app.listen(1111,function(){
    console.log("Server running");
});