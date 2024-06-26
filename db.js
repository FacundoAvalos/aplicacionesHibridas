import mongoose from 'mongoose';


async function connectToDB(){

    try{
        await mongoose.connect('mongodb://127.0.0.1/Disttoo');

        console.log('conexion a base de datos');


    } catch (error){
        console.log('no se conecto a la base de datos')
    }
}

export default connectToDB

