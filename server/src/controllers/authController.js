import User from "../models/User.js";
import {generateToken} from "../utils/generateToken.js";

export const register = async(req,res)=>{
const {name,email,password,role} = req.body;

const user = await User.create({
name,email,password,role
});

res.json({
token: generateToken(user._id),
user
});
};

export const login = async(req,res)=>{
const {email,password} = req.body;

const user = await User.findOne({email});

if(user && await user.matchPassword(password)){
res.json({
token:generateToken(user._id),
user
});
}else{
res.status(401).json({message:"Invalid credentials"});
}
};