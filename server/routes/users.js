const express = require('express')
const router = express.Router()


//User model
const User = require('../models/User')

// @route GET api/users/:id
// @desc fetch a user
router.get('/:userId',  (req, res) => {
    User.find({
    "_id": req.params.userId
    })
    .then(user => {
        res.json({ user })
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
    const { firstName, lastName, email, dob } = req.body;
    User.findOne({email})
    .then( user => {
        if(user){
            res.status(400).json({ msg: "User already exists" });
         } 
         const newUser = new User({
             firstName,
             lastName,
             email,
             dob,
         })

         
        newUser.save()
        .then(user => res.json(user))
    })
})


              
                         

module.exports = router