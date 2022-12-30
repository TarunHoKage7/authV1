const express= require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
    validatePassword,
    validateEmail,
    validateName
} = require("./validator")

let users = {}

router.post("/signup", async (req,res) => {
    try{
        const{ name, email, password } = req.body;
        console.log(name,email,password);
        const userExist = users.hasOwnProperty(email);
        
        if(userExist){
            res.send("user exists");
        }

        if(!validateName(name)) {
            res.send("Invalid name");
        }

        if(!validateName(email)) {
            res.send("Invalid email");
        }

        if(!validateName(password)) {
            res.send("Invalid password");
        }

        const Epassword = await bcrypt.hash(password, 10);

        users[email] = { name, password: Epassword };

        res.send("Success");
    }catch(e){
        res.send(e);
    }
});

router.post("/signin", async (req,res) => {
    try{
        const { email, password } = req.body;
        const userExists = user.hasOwnProperty(email);

        if(!userExists){
            res.send("User does not exist");
        }

        const passMatch = await bcrypt.compare(password, users[email].password);

        if(!passMatch){
            res.send('password mismaatch');
        }

        res.send(Success);
    } catch(e){
        res.send("error");
    }
})

module.exports = router;