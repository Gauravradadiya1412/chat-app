const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
// const { use } = require("../routes/userRoutes");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please fill all the details in order to proceed ahead",
      });
    }

    //check if user already exist
    const userExists = await User.findOne({ where: { email } });
    console.log("9999", userExists);
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    //need to hash password by using bcrypt;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      message: "user created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log("error in user register::", err);
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //first we need to find if user exists in the DB or not
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({ message: "User does not found" });
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    //create and assign a token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.header("auth-token", token).json({ token });
  } catch (err) {
    console.log("login error :: ", err);
  }
};
