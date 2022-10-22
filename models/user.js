import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
    minlength: 3,
    maxlength: 40,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    validate: {
      validator: validator.isEmail,
      message: "Please Provide Valid Email",
    },
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
    maxlength: 20,
    trim: true,
  },
  image: {
    type: Buffer,
  }
});

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.createJWT = async function(){
  const JWT_SECRET = '64ba5050dbefa2e482ae3fef167de65'
  return jwt.sign({userId: this._id,},JWT_SECRET,{expiresIn: '5d'})
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

export default mongoose.model('Users',userSchema);