import UserModel from "../models/user.model.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import 'dotenv/config'

export const getUsersList = async (req, res) => {
  try {
    const userList = await UserModel.find();
    res.status(200).json({ userList });
  } catch (error) {
    res.status(401).json({
      msg: "Acceso denegado",
    });
  }
};

export const createUsers = async (req, res) => {
  try {
    const body = req.body;

    const passwordHas = await bcrypt.hash(body.password, 10);

    const newUser = await new UserModel({
      ...body,
      password : passwordHas
    });

    await newUser.validate();
    newUser.save();

    res.status(201).json({

      msg: "Se creo el Usuario",

    });

  } catch (error) {

    res.status(404).json({

      msg: "No creo el Usuario",

    });

  }
};

export const getUserById =  async(req, res)=>{
    const {id} = req.params

    try {
        const user = await UserModel.findById(id)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({data : error.message , msg:'no se pudo encontrar el usuario'})
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const BODY = req.body

        await UserModel.updateOne(
            { _id: id },

            {
                $set: BODY, // Actualiza todos los campos proporcionados en el body sin alterar los demás campos 😄
            }
        )

        res.status(200).json({ msg:'Usuario modificado'})
    } catch (error) {
        res.status(400).json({ error: error.message, msg: 'no se pudo actualizar el usuario' })
    }
}

export const deleteUserById =  async(req, res) => {
    const {id} = req.params
    try {
        
    await UserModel.findByIdAndDelete(id)
    res.status(200).json({msg: 'Se elimino correctamente el id: ' + id})

    } catch (error) {
        res.status(400).json({msg:'No se pudo eliminar'})
    }
}

export const loginUser = async(req,res)=>{
  const {email,password} = req.body

  try {
      const user = await UserModel.findOne({email})

      if(!user){
          return res.status(400).json({
              msg : 'Usuario no encontrado'
          })
      }

      const match = await bcrypt.compare(password, user.password);
      console.log(match);

      if(!match){
          return res.status(400).json({
              msg : 'Contraseña ivalida'
          })
      }

      const token = jwt.sign(
          {
              sub : user._id
          },
          process.env.SECRET_KEY,
          {
              expiresIn: '5m'
          }
      ) 

      res.cookie('token',token,{httpOnly:true})

      res.status(200).json({msg:'Logeado',token})

  } catch (error) {
      res.status(500).json({msg:'no se pudo logear'})
      
  }

}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.send(false)
}