const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth').auth
const verifyUser = require('../../middleware/auth').verifyUser
const ObjectID = require('mongodb').ObjectID


//Booking model
const Booking = require('../../models/Booking')
//User model
const User = require('../../models/User')
//Hotel model
const Hotel = require('../../models/Hotel')

// @route GET api/bookings?date=date
// @desc Get all bookings
router.get('/',  (req, res) => {
    let { date } = req.query
    if(!date || date === ''){
        date = new Date()
    }
    let today = new Date(date)
    let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

    Booking.find({ "timing": {
        "$gte": today, "$lt": tomorrow
    }})
    .then(bookings => {
        res.json({ bookings })
    })
    .catch(err => {
        console.log(err.response)
    })
})


// @route GET api/bookings/:hotelId?date=date
// @desc Get all bookings of a particular hotel
// @access Public
router.get('/:hoteId',  (req, res) => {

    //Check if Hotel is valid
    if(!ObjectID.isValid(req.params.hoteId)){
        return res.status(400).json({ msg: "Invalid hotel id" })
    }

    Hotel.findById(req.params.hoteId)
    .then(hotel => {
        //Check if Hotel is valid
        if(!hotel){
            return res.status(400).json({ msg: "Invalid Hotel id" })
        }
        let { date } = req.query
        if(!date || date === ''){
            date = new Date()
        }
        let today = new Date(date)
        let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
    
        Booking.find({ 
            "timing": {
            "$gte": today, "$lt": tomorrow
        },
        "hotelId": req.params.hoteId
        })
        .then(bookings => {
            res.json({ bookings })
        })
        .catch(err => {
            console.log(err)
        })
    })
})



// @route GET api/bookings/users/:userId
// @desc Get all bookings of a user
router.get('/users/:userId',  (req, res) => {


    //Check if user is valid
    if(!ObjectID.isValid(req.params.userId)){
        return res.status(400).json({ msg: "Invalid user id" })
    }

    User.findById(req.params.userId)
    .then(user => {
        //Check if user is valid
        if(!user){
            return res.status(400).json({ msg: "Invalid user id" })
        }
        Booking.find({
            userId: req.params.userId
        })
        .sort({ timing: -1 })
        .then(bookings => {
            res.json({ bookings })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })

})



//@route POST api/bookings/:hotelId
// @desc Book a hotel
router.post('/:hotelId', (req, res) => {

    //Check if Hotel is valid
    if(!ObjectID.isValid(req.params.hotelId)){
        return res.status(400).json({ msg: "Invalid Hotel id" })
    }

    Hotel.findById(req.params.hotelId)
    .then(HotelFound => {
         //Check if Hotel is valid
        if(!HotelFound){
            return res.status(400).json({ msg: "Invalid Hotel id" })
        }

        let { timing, Hotel, user } = req.body
        timing = new Date(timing)
        console.log(req.body)
    
        //Check if slot is already booked
        Booking.find({
            timing,
            hotel,
            hotelId: req.params.hotelId,
        })
        .then(booking => {
    
            if(booking.length !== 0){
                return res.status(400).json({ msg: "Slot already booked" })            
            }
    
            //Create new Booking
            const newBooking = new Booking({
                userId: req.user.id,
                hotelId: req.params.hotelId,
                timing,
                hotel,
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
})


//@route DELETE api/bookings/:hotelId/:bookingId
// @desc Cancel a booking
router.delete('/:hotelId/:bookingId', (req, res) => {
         //Check if Hotel is valid
         if(!ObjectID.isValid(req.params.hotelId)){
            return res.status(400).json({ msg: "Invalid Hotel id" })
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