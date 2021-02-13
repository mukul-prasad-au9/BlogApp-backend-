const express = require("express");
const router = express.Router();

let db;
const mongoConnect = require("../mongo")
mongoConnect((data)=>db=data)

const navdata=["post","addpost","admin"]


router.route("/").get((req,res)=>{
    if(req.session.user){
        button = "logout",
        color= "danger"
    }
    else{
        button ="login"
        color ="success"
    }
    db.collection("post").find().toArray((err,data)=>{
        res.render("post",{post:data,navdata,button,color})
    })

})

module.exports = router;