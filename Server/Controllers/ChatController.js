import ChatModel from "../Models/chatModel.js";

export const createChat = async (req, res) => {
  //creating an instance for our chat model
  console.log(req.body, "bodyyyy");
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const findChat = async (req, res) => {
  console.log("function....");
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    console.log(chat, "chaaaaat");
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
