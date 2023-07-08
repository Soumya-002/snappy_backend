const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required:true,
      min:3,
    },
    email: {
      type: String,
      required:true,
    },
    password: {
      type: String,
      required:true,
    },
    isAvatarImageset:{
      type: Boolean,
      default:false,
    },
    avatarImage:{
      type:String,
      default:""
    }
  },
  // {
  //   timestamps: true,
  // }
);

// const MessageModel = mongoose.model("users", userSchema);
module.exports = mongoose.model("Users", userSchema);
// export default MessageModel;