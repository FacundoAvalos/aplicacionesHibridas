import { Router } from "express";

import UserModel from "../models/user.model.js";

import { getUsersList } from "../controllers/user.controller.js";

const router = Router()


// Traer la lista de usuarios



router.get('/', getUsersList)


// Crear un usuario

router.post('/create', async (req, res)=>{
    try{
        const body = req.body;

        const newUser = await new UserModel({
            ...body,
        });
    
        await newUser.validate();
        newUser.save();
    
        res.status(201).json({
            msg: 'Se creo el Usuario'
        })
    }catch (error){
        res.status(404).json({
            msg:'No creo el Usuario'
        })
    }
})


// Modificar usuario

router.patch('/:id', (req, res)=>{
    res.json();
})


// Eliminar un usuario

router.delete('/:id', (req, res)=>{
    res.json();
})


// Mostrar un usuario especifico ID

router.get('/:id', (req, res)=>{
    res.json();
})

export default router