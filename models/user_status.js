import mongoose from "mongoose";
const userStatus = new mongoose.Schema({
  user_id: {
    type: String,
    unique:true,
    trim: true,
  },
  status:{
    type: String,
    trim: true,
  },
  chat_id:{
    type: String,
    trim: true
  }

});

export default mongoose.model('user_stats',userStatus);