import User from "../modules/user.model.js";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, dob } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dob ||
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    dob === ""
  ) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    dob,
  });

  try {
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(403).json({ message: "Invalid email or password" });
  }
  try {
    const validateEmail = await User.findOne({ email });
    if (!validateEmail) {
      return res.status(403).json({ message: "User not found" });
    }
    const validatePassword = await User.findOne({ password });
    if (!validatePassword) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const { password: pass, ...rest } = validateEmail._doc;

    return res.status(200).json({
      message: "User logged in successfully",
      rest,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // Query the database to find the user by their userId
    const user = await User.findById(req.params.id);

    // If user is not found, return an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...rest } = user._doc;

    // If user is found, return the user details
    return res.status(200).json(rest);
  } catch (error) {
    // If an error occurs, return an error response
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
