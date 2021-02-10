const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const port = process.env.PORT || 6700;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(session({
    secret:"secret"
}))

app.use(express.static(__dirname+"/public"));
app.set("views","/view");
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.send("health ok")
})

app.listen(port,()=>{
    console.log("server created")
})