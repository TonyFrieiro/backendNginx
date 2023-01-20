import { Router } from "express";
import userModel from "../models/User.js"
import { createHash, validatePassword } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken"

const router = Router()

router.post("/register",passport.authenticate("register",{failureRedirect:"api/sessions/failedRegister"}), async(req,res)=>{
    // const {firstName, lastName, email, password} = req.body
    // if(!firstName || !lastName || !email || !password) return res.status(400).send({status:"error",error:"faltan valores"})
    // const exists = await userModel.findOne({email})
    // if(exists) return res.status(400).send({status:"error",error:"El ususario ya existe"})
    // const hashedPassword = await createHash(password)
    // const user = {
    //     firstName,
    //     lastName,
    //     email,
    //     password:hashedPassword
    // }
    // const result = await userModel.create(user)
    // res.send({status:"succes",payload:result._id})
    const user = req.user
    res.send({status:"succes",payload:user._id})
})

router.get("/failedRegister",(req,res)=>{
    console.log("Passport Fallo")
    res.status(500).send({status:"error",error:"Error de passport"})
})

router.post("/login",passport.authenticate("login"), async(req,res)=>{
    // const {email,password} = req.body
    // if(!email || !password) return res.status(400).send({status:"error",error:"faltan valores"})
    // const user = await userModel.findOne({email})
    // if(!user) return res.status(400).send({status:"error",error:"usuario no encontrado"})
    // const isValidPassword = await validatePassword(user,password)
    // if(!isValidPassword) return res.status(400).send({status:"error",error:"contraseña incorrecta"})
    // req.session.user = {
    //     name: `${user.firstName} ${user.lastName}`,
    //     email:user.email,
    //     role: user.role
    // }
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email:req.user.email,
        role: req.user.role
    }
    res.send({status:"succes",message:"logueado!"})

})

router.get("/github",passport.authenticate("github"),(req,res)=>{
    // este punto solo abre la palicacions de github para solicitar los datos.
})
router.get("/githubcallback",passport.authenticate("github"),(req,res)=>{
    // este segundo toma los datos que haya dado github con passport
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email:req.user.email,
        role: req.user.role
    }
    res.send({status:"succes",message:"logueado!"})
})


// router.post("/loginjwt",passport.authenticate("login"),async(req,res)=>{
//     console.log(req.user)
//     const user = {
//         name: `${req.user.firstName} ${req.user.lastName}`,
//         email:req.user.email,
//         role: req.user.role
//     }
//     const token = jwt.sign(user,"dajh359gsj",{expiresIn:"1d"})
//     console.log(token)
//     res.send({status:"succes",message:"Logueado",token})
// })

// router.get("/current",(req,res)=>{
//     res.send({a:"a"})
// })

export default router