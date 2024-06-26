//Importaciones
import express from 'express'; //conexion express

import 'dotenv/config'; //dotenv conectado

import cors from 'cors' //conexion de cors

import routerApi from './router/index.router.js'; //conectar index

import connectToDB from './db.js'; //import conectar base de datos

//Configuración

connectToDB()

const app = express();

const port = process.env.PORT ?? 8080 //si esto es nulo

//Middlewares

app.use(express.json())
app.use(cors())

//Rutas

routerApi(app)

//Listening

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})