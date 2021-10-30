const User = mongoose.Schema({
    name:String,
    surname:String,
    age:Number,
    password:String
})

User.statics.create = async (user)=>{
    try{
        await user.save()
        return {status:false,message:"Kullanıcı Başarıyla Oluşturuldu"}
    }catch(err){
        throw {status:false,eror:err}
    }
}

User.statics.getUsers = async ()=>{
    try{
        const response = await User.find()
        return {status:false,data:response}
    }catch(err){
        throw {status:false,eror:err}
    }
}

User.statics.findById = async (userId)=>{
    try{
        const response = await User.findById(userId)
        return {status:false,data:response}
    }catch(err){
        throw {status:false,eror:err}
    }
}

User.statics.update = async (userId,user)=>{
    try{
        const {name,surname,age}=user
        await User.findByIdAndUpdate(userId,{
            $set:{
                name,surname,age
            }
        })
        return {status:false,message:"Kullanıcı Güncellendi"}
    }catch(err){
        throw {status:false,eror:err}
    }
}

module.exports=mongoose.model("User",User)