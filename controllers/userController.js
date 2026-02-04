const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword });
    req.session.user = {
      id: newUser._id,
      username: newUser.username,
    };
    req.session.isAuth = true;
    await req.session.save();
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User does not exist",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = {
        id: user._id,
        username: user.username,
      };

      req.session.isAuth = true;
      await req.session.save();
      res.status(200).json({
        status: "success",
        message: "Login successful",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Could not log out, please try again",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Logout successful",
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
