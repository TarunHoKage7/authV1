const express= require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const createDB = require("../config/db");
const User = require("../models/userModels");
const {
    validatePassword,
    validateEmail,
    validateName,
} = require("../utils/validator");

createDB.sync().then(() => {
    console.log("DB is running");
});

router.get("/", (req, res) => {
    console.log(users);
    res.status(200).send("Server is working well");
});

router.post("/signup", async (req,res) => {
    try{
        const{ name, email, password } = req.body;
        console.log(name, email, password);
        const userExist = await User.findOne({
            email
        });
        
        if(userExist){
            return res.status(403).send("User already exists");
        }

        if(!validateName(name)) {
            return res
                .status(400)
                .send("Invalid user name: name must be longer than two characters and must not include any special characters");
        }

        if(!validateName(email)) {
            return res.status(400).send("Invalid Email");
        }

        if(!validateName(password)) {
            return res
                .status(400)
                .send("Invalid password: name must be atleast 8 characters long and must include atleast: one uppercase letter, one lowercase letter, one digit, and one special character");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        users[email] = { name: name, password: hashedPassword };

        const saveToDB = {
            name, email, password: hashedPassword
        }
        const createdUser = await User.create(saveToDB);

        res.status(201).send("User profile created");
    }catch(err){
        console.log(err);
        return res.status(500).send(err.message);
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