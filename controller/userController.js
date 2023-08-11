const User = require("../models/users");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken')
const statusCodes = require('../easy/status_code')
const { validationRegister, validationLogin}  = require('../easy/validation')
// const JWT_SECRET = 'panner'

// const validationSchema = joi.object({
//   username: joi.string().min(3).max(255).required(),
//   email: joi.string().email().required(),
//   password: joi.string().min(8).max(255).required(),
// });

const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { error } = validationRegister.validate(req.body);

    if (error) {
      res.status(statusCodes.BAD_REQUEST.code).json({ error: error });
      return;
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(statusCodes.SUCCESS.code).json({ error: "Username or email already exists" });
      return;
    }

    hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(statusCodes.BAD_REQUEST.code).json({ error: "Error registering user", err });
  }
};

const logIn = async (req, res) => {
  try{
    const { email , password } = req.body

    const { error } = validationLogin.validate(req.body);
  

    if (error) {
      res.status(statusCodes.BAD_REQUEST.code).json({ error: error });
      return;
    }

    const users = await User.findOne({where: {email}})
     
    if(!users){
      res.status(200).json({ error: "'Invalid credentials'" });
    }

    const Validpassword =  await bcrypt.compare(password, users.password)

    if(!Validpassword){
      res.status(200).json({ error: "'Invalid Password'" });
    }
   
  const token = jwt.sign({signId:users.id}, process.env.JWT_SECRET)
  

  res.status(200).json({token}); 
     
  }catch(err){
    res.status(200).json({ error: "error in log in part ", err });
  }

}
module.exports = { registration, logIn };
