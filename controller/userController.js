const User = require("../model/User")

exports.create = async (req,res)=>{
    try{
        const _user = new User(req.body)
        const response = await _user.crate()
        res.json(response)
    }catch(err){
        res.json(err)
    }
}