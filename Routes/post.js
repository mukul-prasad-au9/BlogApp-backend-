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
        db.collection("comments").find().toArray((er,comments)=>{
            res.render("post",{post:data,navdata,button,color,comments})
        })
    })

})
router.route("/").post((req,res)=>{
    const comments = {
        comments:req.body.comments,
        id:req.body.id
    }
    db.collection("comments").insert(comments,(err,data)=>{
        console.log(comments,"comments")
        res.redirect("/post")
    })
})

module.exports = router;