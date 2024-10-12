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
