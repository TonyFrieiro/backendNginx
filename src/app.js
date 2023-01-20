import express from "express"
import session from "express-session"
import store from "session-file-store"
import MongoStore from "connect-mongo"

const app = express()
const fileStore = store(session)


app.use(session({
    //ttl: time to live = timpo que pasa sin tocar nada antes que expire la session 
    // store: new fileStore({path:"./sessions", ttl:15, retries:0}), <------ persistencia sessiones fileStore
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/baseSessions?retryWrites=true&w=majority",
        ttl:25
    }),
    secret:"holandei3",
    resave:false,
    saveUninitialized:false
}))


app.get("/", (req,res)=>{
    req.session.user = {
        name: "Tony"
    }
    res.send("Hola")
})

app.get("/otra",(req,res)=>{
    console.log(req.session.user)
    res.send(req.session.user)
})


app.listen(8080,()=>console.log("Escuhcando"))