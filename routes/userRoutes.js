import express from "express";
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcrypt'
import { authMiddleware } from "../middleware/authMiddleware.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'
const router = express.Router()

// get all users
let alluser = await Promise.all([
    {id:1,
        firstname:'John',
        lastname:'Doe',
        email:'johndoe@gmail.com',
        phonenumber:  90234572932,
        password: await bcrypt.hash('johndoe123',SALT_ROUNDS) ,
        role: 'user',
    },
    {id:2,
        firstname:'Janet',
        lastname:'Doh',
        email:'janetdoh@gmail.com',
        phonenumber: 90234572932,
        password: await bcrypt.hash('janetdoh123',SALT_ROUNDS) ,
        role:'user',
    },

])
// get a user
router.get('/',authMiddleware,(req,res) => {
    let allfetchuser = alluser.map(({password,backupquestion,...rest}) => rest)
    res.status(200).json(allfetchuser)
})

router.get('/:id',(req,res) => {
    const {id} = req.params
    const checkUser = alluser.find(e => e.id == id)

    if (!checkUser) return res.status(401).json({error: 'User does not exist',status: 401})

    const userdata = {
        email:checkUser.email,
        firstname:checkUser.firstname,
        lastname:checkUser.lastname,
        phonenumber:checkUser.phonenumber,
    }

    return res.status(200).json(userdata)
})

// create user
router.post('/', async (req,res)=>{
    const {email,password,firstname,phonenumber,lastname,backupquestion} = req.body;

    if (!email || !password || !firstname || !phonenumber || !lastname ||!backupquestion) {
        return res.status(401).json({error: 'Error adding user',status: 401})
    }

    const passwordHash = await bcrypt.hash(password,SALT_ROUNDS)

    const checkUser = alluser.find(e => e.email == email && e.phonenumber == phonenumber)
    if (checkUser) {
        return res.status(401).json({error: 'User already exist',status: 401});
    }

    const newuser = {
        id: alluser.length + 1,
        email:email,
        firstname:firstname,
        lastname:lastname,
        phonenumber:phonenumber,
        password: passwordHash,
        backupquestion: backupquestion,
    }
    alluser.push(newuser)
    res.status(201).json(newuser)
} )

// update user
router.put('/:id',(req,res) => {
    const {id} = req.params
    const {email,password,firstname,phonenumber,lastname} = req.body;
    const checkUser = alluser.find(e => e.id == id);
    const checkUser2 = alluser.find(e => e.email == email);
    let finduser = alluser.indexOf(checkUser)

    if (!checkUser || !checkUser2) return res.status(401).json({error: 'User does not exist',status: 401})

    const updateduserdata = {
        email:email,
        firstname:firstname,
        lastname:lastname,
        phonenumber:phonenumber,
        password: checkUser.password
    }

    alluser[finduser] = updateduserdata;
    res.status(201).json(updateduserdata)
})

// delete user
router.delete('/:id',(req,res) => {
    const {id} = req.params
    const checkUser = alluser.find(e => e.id == id);  

    if (!checkUser || !checkUser2) return res.status(401)({error:' does not exist',status: 401})

    alluser = alluser.filter(user => user.id != id);

    res.status(201).json({message:'user deleted succeddully',status: 201})
})

// user login
router.post('/login',async (req,res) => {
    const {email,password} = req.body;

    let userauth = alluser.find(user => user.email == email);

    if (!userauth) {
        return res.status(401).json({error:'User login failure'})
    }

    const isValid = await bcrypt.compare(password,userauth.password)
    if (!isValid) return res.status(401).json({error:'Invalid credentials'});

    const token = jwt.sign(
        {userId:userauth.id, email:userauth.email},
        JWT_SECRET,
        {expiresIn:'2d'}
    )
    return res.status(201).json({message: 'login sucessfully',token})

})

// admin login
router.post('/login/admin',(req,res) => {
    const {email,password} = req.body;

    let userauth = alluser.find(user => user.email == email && user.password == password && user.role == 'admin');

    if (!userauth) {
        return res.status(401).json({error:'User login failure',status: 401})
    }

    return res.status(201).json({message: 'login sucessfully',status: 201})

});

router.post('/profile/resetpassword',async (req,res) => {
    const {email,backupquestion,password} = req.body;

    const authuser = alluser.find(user => user.email == email && user.backupquestion == backupquestion);

    if (!authuser) {
        return res.status(401).json({error:'sorry backup question is incorrect'})
    }
    
    const passwordHash = await bcrypt.hash(password,SALT_ROUNDS)

    alluser = alluser.map(user => user.email == email ? {...user,password: passwordHash} : user);

    res.status(201).json({message: 'password reset succesful'})
})

export default router