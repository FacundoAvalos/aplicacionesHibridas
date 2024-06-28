import 'dotenv/config';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";

/**
? Verificación/autenticación de usuario logueado*/
export const authUser = async (req, res, next) => {
    try {
        //preguntamos si existe una cookie que se llame token
        const token = req.cookies.token;
        //si no existe el toke devolvemos un mensaje de no autorizado
        if (!token) {
            return res.status(401).json({
                msg: 'No han iniciado sesión, no autorizado'
            });
        }
        //decodificamos el token para ver los datos del payload (carga util)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //buscamos el usuario en la base de datos segun el id del payload (decoded)
        const user = await UserModel.findById(decoded.sub, { password: 0 }); //! para que no devuelva la contraseña

        if (!user) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        req.user = user; //? Asigna el usuario a req.user
        
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                msg: "Token expirado"
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                msg: "Token inválido"
            });
        } else {
            console.error(error);
            return res.status(500).json({
                msg: "Error en la autenticación del token"
            });
        }
    }
};

export default authUser;