const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectID


//Booking model
const Booking = require('../models/Booking')
//User model
const User = require('../models/User')
//Restaurant model
const Restaurant = require('../models/Restaurant')

// @route GET api/bookings?date=date
// @desc Get all bookings
router.get('/',  (req, res) => {
    Booking.find()
    .then(bookings => {
        res.json({ bookings })
    })
    .catch(err => {
        console.log(err.response)
    })
})


// @route GET api/bookings/:RestaurantId?date=date
// @desc Get all bookings of a particular Restaurant
router.get('/:restaurantId',  (req, res) => {
    Booking.find({
    "restaurantId": req.params.restaurantId
    })
    .then(bookings => {
        res.json({ bookings })
    })
    .catch(err => {
        console.log(err)
    })
})



// @route GET api/bookings/users/:userId
// @desc Get all bookings of a user
router.get('/users/:email',  (req, res) => {

    Booking.find({
        userId: User.findOne({email:req.params.email})._id
    })
    .then(bookings => {
        res.json({ bookings })
    })
    .catch(err => {
        console.log(err)
    })
})




//@route POST api/bookings/:RestaurantId
// @desc Book a Restaurant
// @requires time, restaurant, email
router.post('/:RestaurantId', (req, res) => {

        let { time, Restaurant, email } = req.body
    
        //Check if slot is already booked
        Booking.find({
            time,
            Restaurant,
            restaurantId: req.params.RestaurantId,
        })
        .then(booking => {
    
            if(booking.length !== 0){
                return res.status(400).json({ msg: "Slot already booked" })            
            }
            
            // const user = User.findOne({email})
            // .then(users => users)
            // .catch(err => {
            //     console.log(err)
            // })

            const newBooking = new Booking({
                userId: user._id,
                restaurantId: req.params.RestaurantId,
                time,
                restaurant: Restaurant,
                user
            })
        
            newBooking.save()
            .then(booking => {
                res.json({msg: "Booking successful", booking})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })


//@route DELETE api/bookings/:RestaurantId/:bookingId
// @desc Cancel a booking
router.delete('/:RestaurantId/:bookingId', (req, res) => {
         //Check if Restaurant is valid
         if(!ObjectID.isValid(req.params.RestaurantId)){
            return res.status(400).json({ msg: "Invalid Restaurant id" })
        }
         //Check if booking is valid
         if(!ObjectID.isValid(req.params.bookingId)){
            return res.status(400).json({ msg: "Invalid booking id" })
        }

        Booking.findById(req.params.bookingId)
        .then(booking => {
            if(!booking){
                return res.status(400).json({ msg: "Invalid booking id" })
            }

            if(req.user.id !== booking.user._id){
                return res.status(401).json({ msg: "Not authorised" })
            }

            Booking.findByIdAndDelete(booking._id)
            .then(() => res.json({ success: true }))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

} )


module.exports = router