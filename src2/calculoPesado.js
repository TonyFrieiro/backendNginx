process.on("message",msg=>{
    // if (cantidad == ""){cantidad = 100000000}
    let array = []
    for (let index = 0; index < 1000000; index++) {
        let num = Math.floor((Math.random()*1000));
        array.push(num)
    }
    process.send(array)


    // let obj = {}
    // for (let index = 0; index < 1000000; index++) {
    //     let num = Math.floor((Math.random()*1000));
    //     let clave = "el numero " + num
    //     obj.clave = 1
    // }
    // process.send(obj)
})


// const calculoPesado = (cantidad) =>{
//     if (cantidad == ""){cantidad = 100000000}
//     let array = []
//     for (let index = 0; index < 10; index++) {
//         let num = Math.floor((Math.random()*1000));
//         array.push(num)
//     }
//     console.log(array)
//     return array
    
// }