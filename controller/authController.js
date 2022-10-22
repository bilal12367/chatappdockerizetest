import BadRequestError from "../errors/BadRequestError.js";
import InvalidCredentialError from "../errors/InvalidCredentialError.js";

import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";

const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user1 = await user.create({ name, email, password });
    const token = await user1.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        _id: user1._id,
        name: user1.name,
        email: user1.email,
        image: null
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user1 = await user.findOne({ email });
    if (user1) {
      const isMatch = await user1.comparePassword(password);
      if (isMatch) {
        const token = await user1.createJWT();
        res.status(StatusCodes.OK).json({
          user: {
            _id: user1._id,
            name: user1.name,
            email: user1.email,
          },
          token,
        });
      } else {
        throw new InvalidCredentialError("The password you've entered is incorrect")
      }
    } else {
      throw new InvalidCredentialError("User not registered");
    }
  } catch (error) {
    next(error);
  }
};

const UpdateUser = (req, res) => {
  res.send("Update User");
};

export { Register, Login, UpdateUser };
