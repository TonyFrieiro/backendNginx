import passport from "passport"
import local from "passport-local"
import userModel from "../models/User.js"
import { createHash,validatePassword } from "../utils.js"
import GithubStretegy from "passport-github2"

const LocalStrategy = local.Strategy

const initializePassport = ()=>{

    passport.use("register",new LocalStrategy({passReqToCallback:true,usernameField:"email"},async(req,email,password,done)=>{
        try {
            const {firstName, lastName} = req.body
            if(!firstName || !lastName) return done(null,false,{message:"Valores incompletos"})
            const exists = await userModel.findOne({email})
            if(exists) return done(null,false,{message:"El ususario ya existe"})
            const hashedPassword = await createHash(password)
            const user = {
                firstName,
                lastName,
                email,
                password:hashedPassword
            }
            const result = await userModel.create(user)
            //SI TODO SALIO BIEN
            done(null,result)
        } catch (error) {
            done(error)
        }

    }))

    passport.use("login", new LocalStrategy({usernameField:"email"},async (email,password,done)=>{
        try {
            if(!email || !password) return done(null,false,{message:"valores incompletos"})
            const user = await userModel.findOne({email})
            if(!user) return done(null,false,{message:"Usuario no encontrado"})
            const isValidPassword = await validatePassword(user,password)
            if(!isValidPassword) return done(null,false,{message:"Contraseña incorrecta"})
            done(null,user)

        } catch (error) {
            done(error)
        }
    }))

    passport.use("github",new GithubStretegy({
        clientID:"Iv1.df2461755ebe0b6a",
        clientSecret:"ba2fc7bf1e49929e5948dc606b56d43965f96f09",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    },async(accesToken,refreshToken,profile,done)=>{
        console.log(profile)
        const {email,name }= profile._json
        let user = await userModel.findOne({email})
        //el usuario no existe?
        if(!user){  //entonces lo creo
            let newUser ={
                firstName : name,
                email,
                password:""
            }
            let result = await userModel.create(newUser)
            return done(null,result)
        }
        return done(null,user)
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await userModel.findOne({_id:id})
        return done(null,result)
    })

}

export default initializePassport