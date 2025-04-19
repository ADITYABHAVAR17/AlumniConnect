import User from "../models/User.js";

export const getVerifiedAlumni = async (req, res) => {
  try {
    const query = {
      isVerified: true,
      role: "alumni",
    };

    // Apply filters only if they are provided
    if (req.query.batch) query.batch = req.query.batch;
    if (req.query.branch) query.branch = req.query.branch;
    if (req.query.jobTitle)
      query.jobTitle = { $regex: req.query.jobTitle, $options: "i" };
    if (req.query.location)
      query.location = { $regex: req.query.location, $options: "i" };

    const alumni = await User.find(query).select("-password");
    res.status(200).json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
