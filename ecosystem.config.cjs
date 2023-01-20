module.exports = {
    apps: [
        {
            name:"proceso1",
            script:"src2/app.js",
            env:{
                PORT:8080
            }
        },
        {
            name:"proceso2",
            script:"src2/app.js",
            env:{
                PORT:8081
            }
        },
        {
            name:"proceso3",
            script:"src2/app.js",
            env:{
                PORT:8082
            },
            exec_mode:"cluster",
            instances:5
        }
    ]
}