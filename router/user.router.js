import { Router } from "express";

import authUser from "../middleware/auth.js";

import { getUsersList, createUsers, getUserById ,updateUserById , deleteUserById,loginUser,logout} from "../controllers/user.controller.js";

const router = Router()

// Traer la lista de usuarios
router.get('/',authUser, getUsersList);

// Crear un usuario
router.post('/create', createUsers);

//Logear Usuario 
router.post('/login',loginUser);

//deslogear usuario
router.get('/logout',authUser,logout);

// Mostrar un usuario especifico ID
router.get('/:id',authUser, getUserById);

// Modificar usuario
router.patch('/:id',authUser, updateUserById);

// Eliminar un usuario
router.delete('/:id',authUser, deleteUserById);

export default router
