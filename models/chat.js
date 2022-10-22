import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        trim: true,
    },
    to: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
    },
    status:{
        type: String,
    },
    files: [String]
}, { timestamps: true }
)
const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        trim: true,
        unique:true,
    },
    participants: [String],
    messages: [messageSchema],
}, {
    timestamps: true
});


export default mongoose.model('Chats', chatSchema);