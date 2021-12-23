const express = require('express')
const router = express.Router()


//User model
const User = require('../models/User')

// @route POST api/users/user
// @desc authenticate a user
router.post('/user',  (req, res) => {
    const {email, password} = req.body;
    User.find({
    "email": email
    })
    .then(user => {
        if(user[0].password==password){
            const send = {"firstname" : user[0].firstName, "lastname" : user[0].lastName, "email": user[0].email}
            res.json(send)
        }else{
            res.json("Unsuccessful")
        }
    })
    .catch(err => {
        console.log(err)
    })
})

// @route GET api/users/
// @desc fetch all users
router.get('/',  (req, res) => {
    User.find()
    .then(user => {
        res.json({ user })
    })
    .catch(err => {
        console.log(err)
    })
})

// @route POST api/users
// @desc Create a user
router.post('/', (req, res) => {
    const { firstName, lastName, email, dob, password } = req.body;
    User.findOne({email})
    .then( user => {
        if(user){
            return res.status(400).json({ msg: "User already exists" });
         } 
         const newUser = new User({
             firstName,
             lastName,
             email,
             dob,
             password
         })

         
        newUser.save()
        .then(user => res.json(user))
    })
})


              
                         

module.exports = router