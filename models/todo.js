import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  todo: {
    type: String,
    trim: true,
  },
  timestamp: {
    type: String,
  },
  checked: {
    type: Boolean,
  }
});


export default mongoose.model('Todos',todoSchema);