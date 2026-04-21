import { where } from "sequelize";
import {User} from "../models/syncModels.js";

export const setRole = async (req,res)=>{
    try{
        const userId = req.user.id;
        const {role} = req.body;

        const user = await User.findByPk(userId);

        if (user.role){
            return res.status(400).json({message: "Role already assigned"});
        }

        await User.update({role}, {where:{userId}});

        res.json({message: "Role updated successfully"});
    }catch (err){
        res.status(500).json({message:"Error updating role"});
    }
};