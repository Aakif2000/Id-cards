let Admin = require("../model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  let { username, password, role } = req.body;
  try {
    if (!username || !password) {
      res.json({
        status: "error",
        message: "Fields are required",
      });
    }
    let user = await Admin.findOne({ username });
    if (user) {
      res.status(404).json({
        status: "error",
        message: "Internal Server Error",
      });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      let newAdmin = await Admin.create({
        username,
        password: hashedPassword,
        role,
      });
      res.json({
        status: "success",
        message: "Admin created successfully",
        newAdmin,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function login(req, res) {
  let { username, password } = req.body;
  try {
    if (!username || !password) {
      res.json({
        status: "error",
        message: "Fields are required",
      });
    }
    else{
        
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "INternal Server Error",
    });
  }
}
module.exports = {
  register,
};
