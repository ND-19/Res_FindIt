const express = require('express')
const router = express.Router()


//User model
const User = require('../models/User')

// @route POST api/users/user
// @desc authenticate a user
router.post('/user',  (req, res) => {
    const {email, password} = req.body;
    User.findOne({
    "email": email,
    "password": password,
    })
    .then(user => {
    if (user) {
      const temp = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        _id: user._id,
      };
      //   res.send("User login successful");
      res.send(temp);
    } else {
      return res.json( false );
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