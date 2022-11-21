import UserModel from "../Models/userModel.js";
import PostModel from "../Models/postModel.js";
//Get all user
export const getAllUser = async (req, res) => {
  const user = await UserModel.find({});

  res.json({ users: user });
};
//Blocking user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const users = await UserModel.findOne({ _id: id });
  const user = await UserModel.updateOne(
    { _id: id },
    { $set: { activeStatus: !users.activeStatus } }
  );
  res.status(200).json({ status: true });
};

export const findOneuser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.json(user);
};
