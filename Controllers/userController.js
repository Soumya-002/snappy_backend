const User = require("../Models/userModel");
const bcrypt = require("bcrypt")

module.exports.register = async (req,res,next) => {
   try {
    const {username,email,password} = req.body;

    const usernameCheck = await User.findOne({username});
    if(usernameCheck)
    return res.json({message:"Username Already used",status:false});
    
    const useremailCheck = await User.findOne({email});
    if(useremailCheck)
    return res.json({message:"Email Already used",status:false});

    
    const Hashedpassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password:Hashedpassword,
    })
    delete user.password;
    return res.json({status:true,user})

   } catch (error) {
    // 
    console.log(error)
   }
 
}

module.exports.login = async (req,res,next) => {
    try {
     const {username,password} = req.body;
 
     const userCheck = await User.findOne({username});
     if(!userCheck)
     return res.json({message:"Username or Password Invalid",status:false});
     
     const passwordCheck = await bcrypt.compare(password,userCheck.password);
     if(!passwordCheck)
     return res.json({message:"Username or Password Invalid",status:false});
 
     delete userCheck.password;
     return res.json({status:true,userCheck})
 
    } catch (error) {
     // 
     console.log(error)
    }
  
 }

 module.exports.setAvatar = async (req,res,next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageset:true,
                avatarImage,
            },
            // {
            //     new:true,
            // }
        );
        return res.json({
            isSet:userData.isAvatarImageset,
            image:userData.avatarImage
        })
    } catch (error) {
        next(error);
    }

 }

 module.exports.getAllusers = async (req,res,next) => {
    try {
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email","username","avatarImage","_id"
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }

 }

 