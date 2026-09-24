const express = require("express");

const authRoutes = require("./routes/authRoute")
const authController = require("./controllers/authController")
const { loginRatelimit } = require("./middlewares/ratelimit")

const errorHandeler = require("./middlewares/errorMiddleware");
const app = express()

app.use(express.json());



app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "server is running"
    })
})

app.post('/register', authController.register);
app.post('/login', loginRatelimit, authController.login);
// app.use(
//     (req,res) =>{
//         res.status(404).json({
//             sucess:false,
//             message: "roiute not found"
//         })
//     }
// )
app.use(
    errorHandeler
)
module.exports = app;
