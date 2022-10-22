import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  fileType: {
    type: String,
    trim: true,
    required:[true,'Please Provide FileType'],
  },
  file: {
      data:{
          type: Buffer,
          trim: true,
      },
      contentType:{
          type:String,
          trim: true,
      }
  }
});


export default mongoose.model('Files',fileSchema);