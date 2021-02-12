const express = require("express");
const session = require("express-session");
const Router = express.Router();
const app = express();
const col_name ="user";
let db;
const mongoConnect = require("../mongo")
mongoConnect((data)=>db=data)

const navdata=["post","addpost","admin"]

app.use(session({
    secret:"token"
}))


Router.get('/login',(req,res) => { 
    const message = req.query.message
    let button = "Login"
    if(req.session.user){
        button = "Logout"
        color="danger"
    }
    else{
        button ="Login" 
        color="success"
    }
    res.render('login',{navdata:navdata,button,color,message})
})
Router.get("/logout",(_,res)=>{
    res.redirect("/login")
})

Router.get('/register',(req,res) => {
    let button = "Login"
    if(req.session.user){
        button = "Logout"
        color="danger"
    }
    else{
        button ="Login"
        color="success"
    }
    res.render('register',{navdata,button,color})
})

Router.get("/admin",(req,res)=>{
    let button = "Login"
    if(req.session.user){
        button = "Logout"
        color="danger"
    }
    else{
        button ="Login"
        color="success"
    }
    db.collection(col_name).find().toArray((err,data)=>{
        if(err) throw err;
        res.render("admin",{data:data,navdata:navdata,button:button,color})
    })
})

Router.post("/login",(req,res)=>{
    const user={
            email:req.body.email,
            password:req.body.password
    }
        db.collection(col_name).findOne(user,(err,data)=>{
            if(err || !data){
                return res.redirect("/login?message=invalid login")

            }
            else{
                req.session.user=data
                return res.redirect("/admin")
            }
        })

    });

Router.post("/register",(req,res)=>{
    user = {
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