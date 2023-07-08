const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const userRoutes =require("./Routes/ChatRoute") 
const MessageRoutes =require("./Routes/MessageRoute") 
const socket = require('socket.io')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",MessageRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("mongodb connected successfully")
}).catch((err)=> {
    console.log(err.message)
});


const PORT =process.env.PORT;
const server = app.listen(PORT,() => 
console.log(`server is running on ${PORT}`));

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        Credentials:true,
    }
})

global.onlineUsers = new Map();
io.on("connection",(socket) => {
    global.chatSocket = socket;
    socket.on("add-user",(userId) => {
        onlineUsers.set(userId,socket.id)
    });

socket.on("send-msg",(data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
        console.log("hii");
        socket.to(sendUserSocket).emit("msg-receive",data.message)
    }
})
});



