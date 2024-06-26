import homeRouter from "./home.router.js"
import userRouter from "./user.router.js"

const routerApi = (app) =>{
    app.use('/', homeRouter)
    
    app.use('/users', userRouter)
}

export default routerApi