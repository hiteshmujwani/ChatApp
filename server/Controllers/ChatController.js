import Message from "../Models/MessageModel.js";


export const getMessages = async (req, res) => {
  try {
    console.log(req.body)
    const receiverId = req.body.RecId
    const SenderId = req.userId
      
    const messages = await Message.find(
        {$and:[{
            $or:[{sender:SenderId,receiver:receiverId},{sender:receiverId,receiver:SenderId}]
        }]}
    )

    if(messages){
      return res.status(200).json({
        msg:"messages fetched",
        success:true,
        data:messages
      })
    }else{
      res.status(200).json({
        msg: "No messages found with this contact",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in fetchning messages ", error);
    res.status(500).json({ msg: "Internal Server Error !" });
  }
};
