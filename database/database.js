const mongoose = require("mongoose");
const db = "mongodb+srv://goutham:goutham@cluster0.prnzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const conn = mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connected to db")
}).catch((err)=>{
    console.log("error in connecting to db");
})

module.exports = conn;