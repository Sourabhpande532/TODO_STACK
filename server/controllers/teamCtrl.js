const Team = require("../model/Team");

exports.getAllTeam = async (req, res) => {
  try {
    const obtainedTeam = await Team.find().populate("member", "name email");
    res.status(200).json({success:true, data: {team: obtainedTeam}})
  } catch (error) {
    console.error(error.message);
    res.status(500).json({success:true, err: error.message})
  }
};

exports.createTeam = async (req, res) => {
  try {
    const { name, description, member } = req.body;
    if (!name || !description || !member) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }
    const newTeam = new Team({
      name,
      description,
      member: member || [],
    });
    newTeam
      .save()
      .catch((err) => console.log(err));
    res.status(201).json({ success: true, data: { team: newTeam } });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error Team" });
  }
};
