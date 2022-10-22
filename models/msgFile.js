import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        trim: true,
        required: [true, 'Please Provide FileType'],
    },
    fileType: {
        type: String,
        trim: true,
        required: [true, 'Please Provide FileType'],
    },
    file: {
        data: {
            type: Buffer,
            trim: true,
        },
        contentType: {
            type: String,
            trim: true,
        }
    }
});


export default mongoose.model('MsgFiles', fileSchema);