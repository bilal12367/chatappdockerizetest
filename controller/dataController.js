// import BadRequestError from "../errors/BadRequestError.js";
// import InvalidCredentialError from "../errors/InvalidCredentialError.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import Todo from "../models/todo.js";
import file from "../models/file.js";
import msgFile from "../models/msgFile.js";
import chat from "../models/chat.js";
import userchatlist from "../models/userchatlist.js";
// import mongoose from "mongoose";

const addTodo = async (req, res, next) => {
  const { user, todo, date } = req.body;
  try {
    const newTodo = await Todo.create({
      userId: user._id,
      todo,
      timestamp: date,
      checked: false,
    });
    if (newTodo) {
      res.status(StatusCodes.OK).json({
        todo: newTodo,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  const { user } = req.body;
  try {
    const allTodos = await Todo.find({ userId: user._id });
    res.status(StatusCodes.OK).json({
      todos: allTodos,
    });
  } catch (error) {
    next(error);
  }
};

const updateTodoState = async (req, res, next) => {
  try {
    const { todoId, state } = req.body;
    const response = await Todo.updateOne(
      { _id: todoId },
      { $set: { checked: state } }
    );
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const updateTodoItem = req.body;
    const response = await Todo.updateOne(
      { _id: updateTodoItem._id },
      { $set: { todo: updateTodoItem.todo } }
    );
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const deleteTodoItem = req.body;
    const response = await Todo.deleteOne({ _id: deleteTodoItem._id });
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getUserChatList = async (req, res, next) => {
  const { userId } = req.body;
  var idlist = [];
  try {
    const chatlist = await userchatlist.find({ userId });
    var resData = []
    var messages = []
    var dict = {}
    Object.values(chatlist).map((item) => {
      var messenger_id = item.messenger_id;
      messages.push({ userId: messenger_id, messages: item.messages })
      idlist.push(messenger_id);
      dict[messenger_id] = item.messages;
    })
    const users = await User.find({
      _id: {
        $in: idlist
      }
    });
    Object.values(users).map(async (item, index) => {
      var file1 = await file.findOne({ userId: item._id, fileType: "profPic" });
      var pic = file1?.file.data.toString();
      if (pic) {
        pic = "data:image/png;base64," + pic;
        resData.push({ user: item, messages: dict[item._id], profPic: pic });
      } else {
        resData.push({ user: item, messages: dict[item._id], profPic: '' });
      }
      if (users.length == resData.length) {
        res.json({ users: resData })
      }
    });
  } catch (error) {

  }
}

const getAllUsers = async (req, res, next) => {
  const resData = [];
  try {
    const users = await User.find({});
    users.forEach(async (item, idx) => {
      const id = item._id.toString();
      var file1 = await file.findOne({ userId: id, fileType: "profPic" });
      var pic = file1?.file.data.toString();
      if (pic) {
        pic = "data:image/png;base64," + pic;
        resData.push({ user: item, profPic: pic });
      } else {
        resData.push({ user: item, profPic: '' });
      }
      if (resData.length == users.length) {
        res.json({ users: resData });
      }
    });

  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  var fileIds = []
  if (req.body.files) {
    Object.values(req.body.files).map(async (fileItem) => {
      var file1 = await msgFile.create({
        fileName: fileItem.name,
        fileType: 'msgFile',
        file: {
          data: fileItem.fileData,
          contentType: fileItem.type
        }
      })
      fileIds.push(file1._id)
      if (fileIds.length == req.body.files.length) {
        const { user1, user2 } = req.body;
        const { message } = req.body;
        const { status } = req.body;
        var id = user1._id > user2._id ? user1._id + '_' + user2._id : user2._id + '_' + user1._id;
        await userchatlist.findOneAndUpdate({ userId: user1._id, messenger_id: user2._id }, { messages: [], lastMessage: message }, { upsert: true })

        if (status == "online") {
          try {
            await userchatlist.findOneAndUpdate({ userId: user2._id, messenger_id: user1._id }, { messages: [], lastMessage: message }, { upsert: true })
            var output = await chat.updateOne({ chatId: id }, { $push: { messages: { from: user1._id, to: user2._id, message: message, status: "sent", files: fileIds } } }, { new: true, upsert: true });
            res.status(200).json({ output })
          } catch (error) {
            next(error);
          }
        } else {
          try {
            var output1 = await chat.updateOne({ chatId: id }, { $push: { messages: { from: user1._id, to: user2._id, message: message, status: "sent", files: fileIds } } }, { new: true, upsert: true });
            var chatlist = await userchatlist.findOne({ userId: user2._id, messenger_id: user1._id });
            if (chatlist != null) {
              var messages = chatlist.messages
              messages.push(message)
              output = await userchatlist.findOneAndUpdate({ userId: user2._id, messenger_id: user1._id }, { messages: messages, lastMessage: message }, { upsert: true })
            } else {
              output = await userchatlist.create({ userId: user2._id, messenger_id: user1._id, messages: [message], lastMessage: message })
            }
            res.status(200).json({ output })
          } catch (error) {
            next(error);
          }
        }
      }
    })
  }else{
        const { user1, user2 } = req.body;
        const { message } = req.body;
        const { status } = req.body;
        var id = user1._id > user2._id ? user1._id + '_' + user2._id : user2._id + '_' + user1._id;
        await userchatlist.findOneAndUpdate({ userId: user1._id, messenger_id: user2._id }, { messages: [], lastMessage: message }, { upsert: true })

        if (status == "online") {
          try {
            await userchatlist.findOneAndUpdate({ userId: user2._id, messenger_id: user1._id }, { messages: [], lastMessage: message }, { upsert: true })
            var output = await chat.updateOne({ chatId: id }, { $push: { messages: { from: user1._id, to: user2._id, message: message, status: "sent", files: [] } } }, { new: true, upsert: true });
            res.status(200).json({ output })
          } catch (error) {
            next(error);
          }
        } else {
          try {
            var output1 = await chat.updateOne({ chatId: id }, { $push: { messages: { from: user1._id, to: user2._id, message: message, status: "sent", files: [] } } }, { new: true, upsert: true });
            var chatlist = await userchatlist.findOne({ userId: user2._id, messenger_id: user1._id });
            if (chatlist != null) {
              var messages = chatlist.messages
              messages.push(message)
              output = await userchatlist.findOneAndUpdate({ userId: user2._id, messenger_id: user1._id }, { messages: messages, lastMessage: message }, { upsert: true })
            } else {
              output = await userchatlist.create({ userId: user2._id, messenger_id: user1._id, messages: [message], lastMessage: message })
            }
            res.status(200).json({ output })
          } catch (error) {
            next(error);
          }
        }
  }


}

const getMessages = async (req, res, next) => {
  console.log("Get messages Called")
  const { user1, user2 } = req.body;
  var id = user1 > user2 ? user1 + '_' + user2 : user2 + '_' + user1;
  try {
    const chat1 = await chat.findOne({ chatId: id });
    var chatlist = await userchatlist.findOneAndUpdate({ userId: user1, messenger_id: user2 }, { messages: [] })
    if (chat1) {
      res.status(200).json({ messages: chat1.messages });
    } else {
      res.status(200).json({ messages: [] });
    }
  } catch (error) {
    next(error)
  }
}
const testApi = async (req, res, next) => {
  // await chat.watch([{ $match: { chatId: '6288ee7d0df1d3bf2a576980_62861fec3b07036e2b26ddd5' } }]).on('change', data => { console.log('data'); console.log(data) })
  const pipeline = [
    {
      $match: {
        'fullDocument.chatId': '6288ee7d0df1d3bf2a576980_62861fec3b07036e2b26ddd5',
      }
    },
    // { $project: { 'fullDocument._id': 1, 'fullDocument.chatId': 1,'fullDocument.messages': 1 } }
  ]
  chat.watch(pipeline, { fullDocument: "updateLookup" }).on('change', (data) => {
  });
  res.send('hi')
}

const getFile = async (req,res,next) => {
  var fileId = req.body.fileId
  const res1 = await msgFile.findOne({_id: fileId});
  var fileString = res1.file.data.toString()
  var body = {
    fileId: fileId,
    name: res1.fileName,
    fileType: res1.fileType,
    type: res1.file.contentType,
    fileUrl: fileString
  }
  res.json({res: body})
}


const refetchUser = async(req,res,next)=>{
  const user = req.body.user;
  const updatedUser = await User.findOne({_id: user._id})
  const token = await updatedUser.createJWT();
  res.json({user: updatedUser,token})
}


export {
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
};
