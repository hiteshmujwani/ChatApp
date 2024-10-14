import mongoose from "mongoose";
import Message from "../Models/MessageModel.js";
import { User } from "../Models/UserModel.js";


export const searchContact = async (req, res) => {
  try {
    const {searchTerm} = req.body;
    const contacts = await User.find(
      {
        $and: [
          {
            $or: [
              { firstname: { $regex: searchTerm, $options: 'i' } },
              { lastname: { $regex: searchTerm, $options: 'i' } },
              { email: { $regex: searchTerm, $options: 'i' } }
            ]
          },
          { _id: { $ne: req.userId } }
        ]
      }
    ).select("-password")

    if(contacts){
      return res.status(200).json({
        msg:"Searched Contacts",
        success:true,
        data:contacts
      })
    }else{
      res.status(200).json({
        msg: "No contact found with this name",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in search ", error);
    res.status(500).json({ msg: "Internal Server Error !" });
  }
};


export const getContactsForDMList = async (req, res) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$receiver",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error)
  }
};