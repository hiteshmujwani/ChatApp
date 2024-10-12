export const searchContact = async (req, res) => {
  try {
    res.status(200).json({
      msg: "something found in search",
      success: true,
    });
  } catch (error) {
    console.log("Error in search ", error);
    res.status(500).json({ msg: "Internal Server Error !" });
  }
};
