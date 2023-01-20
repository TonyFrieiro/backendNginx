import { Router } from "express";
import ContenedorMongoDb from "../manager/productos.manager.js"

let manager = new ContenedorMongoDb()

const productosRouter = new Router()


const router = Router()


router.get("/",(req,res)=>{
    res.render("register")
})

router.get("/login",async(req,res)=>{
    let productos = await manager.listarAll()
    let productos2 = JSON.stringify(productos)
    let productos3 = JSON.parse(productos2)
    let productos4 = productos3.map(p=>p)
    console.log(productos4)
    if(req.session.user){
        res.render("login2",{
            usuario:req.session.user,
            productos4
        })
    }
    res.render("login",{
    })
})

router.get("/profile",(req,res)=>{
    if(req.session.user){
        res.render("profile",{user:req.session.user})
    }else{
        res.status(401).send({status:"error",error:"Not authenticated"})
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if (err) return res.status(500).send("no pude cerrar sesion")
    })
    // res.render('logout', setTimeout(function () {
    //     res.redirect('/login');
    // }, 2000))
    setTimeout(function(){
        res.redirect('/login');
    }, 2000);
})

export default router