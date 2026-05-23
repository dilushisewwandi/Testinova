import { where } from "sequelize";
import {User} from "../models/syncModels.js";

export const setRole = async (req,res)=>{
    try{
        const userId = req.user.id;
        const {role} = req.body;

        if (!role) {
            return res.status(400).json({message: "Role is required"});
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        await User.update({role}, {where:{userId}});

        const updatedUser = await User.findByPk(userId);

        res.json({
            message: "Role updated successfully",
            user: {
                id: updatedUser.userId,
                name: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    }catch (err){
        console.error(err);
        res.status(500).json({message:"Error updating role"});
    }
};