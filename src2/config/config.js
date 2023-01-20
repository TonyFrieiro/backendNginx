import dotenv from "dotenv"


dotenv.config()


export default {
    mongo:{
        USER : process.env.MONGO_USER, 
        PWD  : process.env.MONGO_PASSWORD,
        DB   : process.env.MONGO_DATABASE
    }
}