const express = require("express")
const mongoose = require("mongoose")
const app = express()

const {MONGO_IP,MONGO_USER,MONGO_PORT,MONGO_PASSWORD} = require("./config")
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`


mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
})
.then(data=>console.log("Connection Success: ",data))
.catch(err=>console.log("Connection Fail: ",err))

const port = process.env.PORT || 4000

const User = mongoose.Schema({
    name:String,
    surname:String,
    age:Number,
    password:String
})

const userModel = new mongoose.model("User",User)

const saveUser = async (req,res)=>{
    try{
        const _user = new userModel({
            name:"Kadir",
            surname:"Deniz",
            age:22,
            password:"123456789"
        })
        const response = await _user.save()
        res.json(response)
    }catch(err){
        res.json(err)
    }
}

const getUsers = async (req,res)=>{
    try{
        const response = await userModel.find({})
        if(!response){
            res.json({status:false,message:"Kullanıcı Bulunamadı"})
        }else{
            res.json({status:true,data:response})
        }
    }catch(err){
        res.json(err)
    }
}

app.get("/",saveUser)

app.get("/getusers",getUsers)

app.listen(port,()=>console.log(`Server Started at ${port}`))