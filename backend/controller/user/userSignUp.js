const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  
  try {
    const { name, email, number, password } = req.body;

    const user = await userModel.findOne({email})

    if (user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already in use",
      });
    }



    if (!name) {
      return res.status(400).json({ success: false, message: "Please provide name" });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: "Please provide email" });
    }
    if (!number) {
      return res.status(400).json({ success: false, message: "Please provide number" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Please provide password" });
    }



    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    if(!hashedPassword){
      throw new Error("Something went wrong")
    }

    const payload={
      ...req.body,
      role: "GENERAL",
      password : hashedPassword
    }

    const userData = new userModel(payload);
    const saveUser = userData.save()

    res.status(201).json({
      dat : saveUser,
      success: true,
      error: false,
      message: "Sign Up sucessful!"
    })

  } catch (err) {
    res.json({
      message: err,
      sucess: false,
      error: true,
    });
  }
}

module.exports =  userSignUpController;