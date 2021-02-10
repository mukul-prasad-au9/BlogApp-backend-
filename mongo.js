const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017"

const MongoConnect = (value)=>{
        mongoClient.connect(url)
        .then((connection)=>{
            value(connection.db("blog"))
        })
        .catch((err)=>console.log(err))
}

module.exports = MongoConnect;