
import express from "express";
import { Register, Login, UpdateUser } from "../controller/authController.js";
import {
  addTodo,
  getTodos,
  updateTodoState,
  updateTodo,
  deleteTodo,
  getAllUsers,
  testApi,
  sendMessage,
  getMessages,
  getUserChatList,
  getFile,
  refetchUser
} from "../controller/dataController.js";
import multer from "multer";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/updateuser").post(UpdateUser);
router.route("/addTodo").post(addTodo);
router.route("/getTodos").post(getTodos);
router.route("/updateTodoState").post(updateTodoState);
router.route("/updateTodo").post(updateTodo);
router.route("/deleteTodo").post(deleteTodo);
router.route("/getAllUsers").get(getAllUsers);
router.route("/testApi").get(testApi);
router.route("/sendMessage").post(sendMessage);
router.route("/getMessages").post(getMessages);
router.route("/getUserChatList").post(getUserChatList);
router.route("/getFileFromId").post(getFile);
router.route("/getUser").post(refetchUser)
export default router;
