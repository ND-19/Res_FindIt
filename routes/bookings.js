const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectID


//Booking model
const Booking = require('../models/Booking')
//User model
const User = require('../models/User')
//Restaurant model
const Restaurant = require('../models/Restaurant')
//Review model
const Review = require('../models/Review')

const Contact = require('./contact')
// @route GET api/bookings?date=date
// @desc Get all bookings
router.get('/', (req, res) => {
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
router.get('/:restaurantId', (req, res) => {
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
router.get('/users/:id', (req, res) => {

    Booking.find({
        userId: req.params.id
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

    let { time, Restaurant, date, userId, numberOfPeople, email } = req.body

    //Check if slot is already booked
    Booking.find({
        time,
        Restaurant,
        restaurantId: req.params.RestaurantId,
        date,
        userId,
        numberOfPeople
    })
        .then(booking => {

            if (booking.length !== 0) {
                return res.status(400).json({ msg: "Slot already booked" })
            }

            const newBooking = new Booking({
                userId,
                restaurantId: req.params.RestaurantId,
                time,
                restaurant: Restaurant,
                date,
                numberOfPeople
            })
            console.log(newBooking)

            newBooking.save()
                .then(booking => {
                    Contact(email, `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                    table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                    }

                    td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                    }

                    tr:nth-child(even) {
                    background-color: #dddddd;
                    }
                    </style>
                </head>
                <body>
                        <div> Thanks for booking: </div> <div ><table class="container table table-sm table-primary">
                        <tbody class="">
                            <tr>
                                <td>User ID</td>
                                <td>${booking.userId}</td>
                            </tr>
                            <tr>
                                <td>Restaurant Name</td>
                                <td>${booking.restaurant.name}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>${booking.date}</td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td>${booking.time}</td>
                            </tr>
                            <tr>
                                <td>Number of Guest</td>
                                <td>${booking.numberOfPeople}
                                    
                                </td>
                            </tr>
    
                            
                        </tbody>
                    </table>
                </div>
                </body>
                </html>`)
                    res.json({ msg: "Booking successful", booking })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

//add review /addreview
router.post('/reviews/addreview', (req, res) => {

    let { bookingId, rating, review, avgcost, restaurantId } = req.body
    const newReview = new Review({
        bookingId,
        restaurantId,
        rating,
        review,
        averageCostForTwo: avgcost
    })
    newReview.save()
        .then(review => {
            res.json({ msg: "Review added successfully", review })
        })
        .catch(err => {
            console.log(err)
        })
})


//@route DELETE api/bookings/:RestaurantId/:bookingId
// @desc Cancel a booking
// router.delete('/:RestaurantId/:bookingId', (req, res) => {
//          //Check if Restaurant is valid
//          if(!ObjectID.isValid(req.params.RestaurantId)){
//             return res.status(400).json({ msg: "Invalid Restaurant id" })
//         }
//          //Check if booking is valid
//          if(!ObjectID.isValid(req.params.bookingId)){
//             return res.status(400).json({ msg: "Invalid booking id" })
//         }

//         Booking.findById(req.params.bookingId)
//         .then(booking => {
//             if(!booking){
//                 return res.status(400).json({ msg: "Invalid booking id" })
//             }

//             if(req.user.id !== booking.user._id){
//                 return res.status(401).json({ msg: "Not authorised" })
//             }

//             Booking.findByIdAndDelete(booking._id)
//             .then(() => res.json({ success: true }))
//             .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))

// } )


module.exports = router