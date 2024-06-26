import UserModel from "../models/user.model.js";

export const getUsersList = async (req, res)=>{

    try{
        const userList = await UserModel.find()
        res.status(200).json({userList})
    }catch(error){  
        res.status(401).json({
            msg: 'Acceso denegado'
        })

    }

}