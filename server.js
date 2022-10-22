import express, { response } from "express";
import cors from "cors";
import router from "./router/Router.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/error-handler.js";
import path from "path";
import multer from "multer";
import bodyparser from "body-parser";
import fs from "fs";
import User from "./models/user.js";
import chat from "./models/chat.js";
import fileschema from "./models/file.js";
import http from "http";
import { Server } from "socket.io";
import userStatus from "./models/user_status.js";
import userchatlist from "./models/userchatlist.js";
import file from "./models/file.js";
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
let upload = multer();  
// let upload = multer({ dest: "uploads/" });  
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use("/api/v1", router);
app.use(ErrorHandler);
app.post("/test", async (req, res) => {
  res.json(req.body);
  // chat.find({}).then((data) => {
  //   res.status(200).json({
  //     result: data
  //   })
  // })
  // var ids = [
  //   '62a05ff53960586ffa00b261',
  //   '62a05ffa3960586ffa00b263',
  //   '62a05ffe3960586ffa00b265',
  //   '62a060013960586ffa00b267',
  //   '62a0600c3960586ffa00b269',
  //   '62a0600f3960586ffa00b26b'
  // ]
  // var resp = [];
  // ids.forEach((item, index) => {
  //   chat.findOneAndUpdate({ _id: "62a05ff6466562faec797dd8", "messages._id": item }, { $set: { "messages.$.message": "changed 1234" }, }, (err, result) => {
  //     if (err) {
  //       res.status(500).json({
  //         err: 'Didnt happened'
  //       })
  //     } else {
  //       resp.push({ index, result })
  //       if (index == ids.length - 1) {
  //         res.json({ resp })
  //       }
  //     }
  //   })
  // })

  // SET CONDITION OF IF THE USER READING IS TO THEN ONLY TO WILL GET SET SEEN

  // try {
  //   const chat1 = await chat.findOne({ chatId: "6288ee7d0df1d3bf2a576980_62861fec3b07036e2b26ddd5" });
  //   var ids = []
  //   Object.values(chat1.messages).map((item) => {
  //     if (item.status) {
  //       if (item.status == "sent") {
  //         ids.push(item._id);
  //       }
  //     } else {
  //       ids.push(item._id);
  //     }
  //   });
  //   var resp = [];
  //   ids.forEach((item, index) => {
  //     chat.findOneAndUpdate({ _id: "62a05ff6466562faec797dd8", "messages._id": item }, { $set: { "messages.$.status": "seen" }, }, (err, result) => {
  //       if (err) {
  //         res.status(500).json({
  //           err: 'Didnt happened'
  //         })
  //       } else {
  //         if (index == ids.length - 1) {
  //           resp.push({ index, result: result.messages.slice(result.messages.length - 6) })
  //           res.json({ resp })
  //         }
  //       }
  //     })
  //   })
  // } catch (error) {

  // }
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", { data: "hello" });
};
app.get("/api/v1/getFile", async (req, res) => {
  const user = JSON.parse(req.query.user);
  const file = await fileschema.findOne({ userId: user._id });
  if (file) {
    res.json({ img: file.file.data.toString() });
  } else {
    res.json({ msg: "no profile pic" });
  }
  // const user1 = await User.findOne(
  //   { _id: req.query.user._id },
  // )
  // console.log(JSON.parse(user1));
  // const dataUrlImage = "data:image/png;base64," + JSON.parse(user1).image;
  // res.json({ image: dataUrlImage });
});

app.post(
  "/api/v1/uploadfile",
  upload.single("myFile"),
  async (req, res, next) => {
    const file = req.file;
    const user = JSON.parse(req.body.user1);
    const fileType = JSON.parse(req.body.fileType).fileType;
    const newName = JSON.parse(req.body.name).name[0];
    await User.findOneAndUpdate({ _id: user._id }, { name: newName });
    const updatedResult = await User.findOne({ _id: user._id });
    if (!file) {
      // const error = new Error('Please upload a file')
      // error.httpStatusCode = 400
      // return next(error)
    } else {
      const rawdata = await fs.readFileSync("uploads/" + file.filename);
      const fileBase64 = await Buffer.from(rawdata).toString("base64");
      const file1 = await fileschema.findOne({ userId: user._id });
      if (fs.existsSync("uploads/" + file.filename)) {
        fs.unlink("uploads/" + file.filename, function (err) {
          if (err) throw err;
        });
      }
      if (file1) {
        fileschema
          .updateOne(
            { userId: user._id },
            {
              $set: {
                file: {
                  data: fileBase64,
                  contentType: file.mimetype,
                },
              },
            }
          )
          .then(async (response) => {
            const token = await updatedResult.createJWT();
            res.json({ updatedUser: updatedResult, token });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        fileschema
          .create({
            userId: user._id,
            fileType: fileType,
            file: {
              data: fileBase64,
              contentType: file.mimetype,
            },
          })
          .then(async (response) => {
            const token = await updatedResult.createJWT();
            res.json({ updatedUser: updatedResult, token });
          })
          .catch((err) => {
            next(err);
          });
      }
      // User.updateOne(
      //   { _id: user._id },
      //   { $set: { image: fileBase64 } },
      //   { upsert: true }
      // )
      //   .then((response) => {
      //     console.log(response);
      //     res.json({ response });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({ err });
      //   });
    }
  }
);

//------------------deployment-------------------------//

var __dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log("Server running ...");
}

//------------------deployment-------------------------//
//------------------deployment-------------------------//

// app.listen(process.env.PORT || 5000, async () => {
//   try {
//     await connectDB(process.env.MONGO_URL);
//     console.log("Server started listening at port 5000...");
//   } catch (error) {
//     console.log(error);
//   }
// });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});
io.on("connection", async (socket) => {
  var userData, selectedUser;
  var messageWatcher = null;
  socket.on("user", async (data) => {
    userData = data.user;
    if (data.selectedUser) {
      selectedUser = data.selectedUser;
      var chat_id1;
      if (userData._id > selectedUser._id) {
        chat_id1 = userData._id + "_" + selectedUser._id;
      } else {
        chat_id1 = selectedUser._id + "_" + userData._id;
      }
      const userstatus1 = await userStatus.findOne({ user_id: userData._id });
      var status = "online";
      if (userstatus1) {
        await userStatus.findOneAndUpdate(
          { user_id: userData._id },
          { $set: { status: "online", chat_id: chat_id1 } }
        );
      } else {
        await userStatus.create({
          user_id: userData._id,
          status: "online",
          chat_id: chat_id1,
        });
      }
    } else {
      const userstatus1 = await userStatus.findOne({ user_id: userData._id });
      var status = "online";
      if (userstatus1) {
        await userStatus.findOneAndUpdate(
          { user_id: userData._id },
          { $set: { status: "online", chat_id: "" } }
        );
      } else {
        await userStatus.create({
          user_id: userData._id,
          status: "online",
          chat_id: "",
        });
      }
    }
  });
  const processData = async (chatlist) => {
    var resData = [];
    var idlist = [];
    var messages = [];
    var dict = {};
    Object.values(chatlist).map((item) => {
      var messenger_id = item.messenger_id;
      messages.push({ userId: messenger_id, messages: item.messages });
      idlist.push(messenger_id);
      dict[messenger_id] = {
        messages: item.messages,
        lastMessage: item.lastMessage,
        updatedAt: item.updatedAt,
      };
    });
    const users = await User.find({
      _id: {
        $in: idlist,
      },
    });
    if (users.length === 0) {
      socket.emit("user_chat_list", { users: [] });
    } else {
      Object.values(users).map(async (item, index) => {
        var file1 = await file.findOne({
          userId: item._id,
          fileType: "profPic",
        });
        var pic = file1?.file.data.toString();
        if (pic) {
          pic = "data:image/png;base64," + pic;
          resData.push({
            user: item,
            messages: dict[item._id].messages,
            profPic: pic,
            lastMessage: dict[item._id].lastMessage,
            updatedAt: dict[item._id].updatedAt,
          });
        } else {
          resData.push({
            user: item,
            messages: dict[item._id].messages,
            profPic: "",
            lastMessage: dict[item._id].lastMessage,
            updatedAt: dict[item._id].updatedAt,
          });
        }
        // console.log('resData.length', resData.length)
        if (users.length == resData.length) {
          socket.emit("user_chat_list", { users: resData });
        }
      });
    }
  };
  socket.on("send_message", async (data) => {
    const { user1, user2 } = data;
    const { message } = data;
    const { status } = data;
    var id =
      user1._id > user2._id
        ? user1._id + "_" + user2._id
        : user2._id + "_" + user1._id;
    if (status == "online") {
      try {
        var output = await chat.updateOne(
          { chatId: id },
          {
            $push: {
              messages: {
                from: user1._id,
                to: user2._id,
                message: message,
                status: "sent",
              },
            },
          },
          { new: true, upsert: true }
        );
      } catch (error) {
        console.log("Error from send message" + error);
      }
    } else {
      try {
        await chat.updateOne(
          { chatId: id },
          {
            $push: {
              messages: {
                from: user1._id,
                to: user2._id,
                message: message,
                status: "sent",
              },
            },
          },
          { new: true, upsert: true }
        );
        var chatlist = await userchatlist.findOne({
          userId: user2._id,
          messenger_id: user1._id,
        });
        if (chatlist != null) {
          var messages = chatlist.messages;
          messages.push(message);
          output = await userchatlist.findOneAndUpdate(
            { userId: user2._id, messenger_id: user1._id },
            { messages: messages },
            { upsert: true }
          );
        } else {
          output = await userchatlist.create({
            userId: user2._id,
            messenger_id: user1._id,
            messages: [message],
          });
        }
      } catch (error) {
        console.log("ERror from send message" + error);
      }
    }
  });
  socket.on("get_user_chat_list", async (data) => {
    // data = JSON.parse(data);
    const userId = data.user._id;
    try {
      const chatlist = await userchatlist.find({ userId });
      await processData(chatlist);
      const pipeline = [
        {
          $match: {
            "fullDocument.userId": userId,
          },
        },
        // { $project: { 'fullDocument._id': 1, 'fullDocument.chatId': 1,'fullDocument.messages': 1 } }
      ];
      userchatlist
        .watch(pipeline, { fullDocument: "updateLookup" })
        .on("change", async (data) => {
          const chatlist = await userchatlist.find({
            userId: data.fullDocument.userId,
          });
          await processData(chatlist);
        });
    } catch (error) {
      console.log("ERROR from get user chat list: " + error);
    }
  });
  socket.on("get_stat", async (data) => {
    var user = data;
    const user_status = await userStatus.findOne({ user_id: user._id });
    if (user_status) {
      socket.emit("user_status", user_status);
    } else {
      const createdStatus = await userStatus.create({
        user_id: user._id,
        status: "offline",
        chat_id: "",
      });
      socket.emit("user_status", createdStatus);
    }
    const pipeline = [
      {
        $match: {
          "fullDocument.user_id": user._id,
        },
      },
      // { $project: { 'fullDocument._id': 1, 'fullDocument.chatId': 1,'fullDocument.messages': 1 } }
    ];
    userStatus
      .watch(pipeline, { fullDocument: "updateLookup" })
      .on("change", (data) => {
        socket.emit("user_stat_changed", data.fullDocument);
      });
  });
  socket.on("closing", async (data) => {
    if (data.user) {
      await userStatus.findOneAndUpdate(
        { user_id: data.user._id },
        { status: "offline", chat_id: "" }
      );
    }
  });
  socket.on("disconnect", async (data) => {
    if (messageWatcher) {
      messageWatcher.close();
    }
    if (userData) {
      const output = await userStatus.findOneAndUpdate(
        { user_id: userData._id },
        { status: "offline", chat_id: "" }
      );
    }
  });
  socket.on("invoke_func", (data) => {});

  socket.on("get_messages", async (data) => {
    console.log("Get Messages Called");
    await messageWatcher?.close();
    const messagesList = data.selectedUser.messages;
    const user = data.user;
    userData = data.user;
    selectedUser = data.selectedUser;
    const user1 = user._id;
    const user2 = selectedUser._id;
    var id = user1 > user2 ? user1 + "_" + user2 : user2 + "_" + user1;
    try {
      const chat1 = await chat.findOne({ chatId: id });
      if (chat1) {
        socket.emit("rec_msg", { messages: chat1.messages, chatId: id });
        if (messagesList.length != 0) {
          await userchatlist.findOneAndUpdate(
            { userId: user1, messenger_id: user2 },
            { messages: [] }
          );
        }
        // res.status(200).json({ messages: chat1.messages });
      } else {
        socket.emit("rec_msg", { messages: [], chatId: id });
      }
    } catch (error) {
      console.log("error from get messages socket");
      console.log(error);
    }
    const pipeline = [
      {
        $match: {
          "fullDocument.chatId": id,
        },
      },
      // { $project: { 'fullDocument._id': 1, 'fullDocument.chatId': 1,'fullDocument.messages': 1 } }
    ];
    messageWatcher = await chat
      .watch(pipeline, { fullDocument: "updateLookup" })
      .on("change", (data) => {
        console.log("Updated Fields Data :>> ", data);
        var updatedFields;
        if (data.updateDescription?.updatedFields) {
          updatedFields = data.updateDescription.updatedFields;
          var updatedField;
          for (var i in updatedFields) {
            var key = i;
            var val = updatedFields[i];
            if (key.includes("message")) {
              updatedField = val;
            }
          }
          // console.log(data.fullDocument.messages[data.fullDocument.messages.length-1]);
          var chatId = data.fullDocument.chatId;
          socket.emit("rec_msg_update", {
            message: updatedField,
            chatId: data.fullDocument.chatId,
          });
        } else {
          updatedFields = data.fullDocument.messages[0];
          socket.emit("rec_msg_update", {
            message: updatedFields,
            chatId: data.fullDocument.chatId,
          });
        }
      });
  });
});
server.listen(process.env.PORT || 5000, async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Server started listening at port 5000...");
  } catch (error) {
    console.log(error);
  }
});
