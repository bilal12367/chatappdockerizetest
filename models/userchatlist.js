import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  messenger_id: {
    type: String,
    trim: true
  },
  messages: [String],
  lastMessage: {
    type: String,
  }
},{ timestamps: true });


export default mongoose.model('UserchatList',todoSchema);