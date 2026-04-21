import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js"; 


dotenv.config();

// SIGNUP
export const signup = async (req, res) => {
  let{ username, email, password } = req.body;

  try {

    //avoid spaces
    username = username?.trim();
    email = email?.trim();
    password = password?.trim();

    //validate username
    if(!username || username.length <3){
      return res.status(400).json({message:"Username is too short!"});
    }

    //validate email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!email || !emailRegex.test(email)){
      return res.status(400).json({message:"This email is not valid"});
    }

    //password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if(!password || !passwordRegex.test(password)){
      return res.status(400).json({message:"This password is not valid"});
    }

    //user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //password hashing
    const hashedPassword = bcrypt.hashSync(password, 10);

    //create new user
    const newUser = await User.create({username,email,password: hashedPassword,});

    return res.status(201).json({ message: "🎉 Welcome to the Testinova", 
      user:{id: newUser.userId,
        name: newUser.username,
        email: newUser.email,
        role: newUser.role
      } ,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "User could not signup!" });
  }
};

// LOGIN
export const login = async (req, res) => {
  let { email, password } = req.body;
  email = email?.trim();
  password = password?.trim();

  try {
    if(!email || !password){
      return res.status(400).json({message:"You need both email and password to login!"});
    }
    //find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    //validate password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    //create JWT token
    const token = jwt.sign(
      { id: user.userId, username:user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   return res.json({ message: "🌟 Welcome back!", 
    token,
  user:{
    id: user.userId,
    name:user.username,
    email:user.email,
    role:user.role,
  }, });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Try again later!" });
  }
};
