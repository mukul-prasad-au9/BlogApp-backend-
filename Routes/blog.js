const express = require("express");
const Router = express.Router();
const col_name ="user";
let db;
const mongoConnect = require("../mongo")
mongoConnect((data)=>db=data)

Router.get('/login',(req,res) => { 
    res.render('login')
})

Router.get('/register',(req,res) => {
    res.render('register')
})

Router.get("/admin",(req,res)=>{
    db.collection(col_name).find().toArray((err,data)=>{
        if(err) throw err;
        res.render("admin",{data:data})
    })
})

Router.post("/login",(req,res)=>{
    let user ={
        email:req.body.email,
        password:req.body.password
    }
    db.collection(col_name).findOne(user,(err,data)=>{
        if(err || !data){
            return res.redirect("/login?invalid login")
        }
        else{
            return res.redirect("/admin")
        }
    })
})

Router.post("/register",(req,res)=>{
    let user = {
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password
    }
    db.collection(col_name).insert(user,(err,data)=>{
        if(err) throw err;
        return res.redirect("/login?succesful")
    })
})

module.exports = Router;