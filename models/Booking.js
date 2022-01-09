const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = require('./Restaurant').schema
const UserSchema = require('./User').schema

const BookingSchema = new Schema({
    userId: {
        type: String, 
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now
    },
    restaurant: {
        type: RestaurantSchema,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    time:{
            type: String,
            required: true
    },
    numberOfPeople: {
        type: String,
        required: true,
    }
    // status:{
    //     type: String,
    //     required: true,
    //     default: "booked",
    // }
    }
)
//image of restaurant and video
module.exports = Booking = mongoose.model('booking', BookingSchema)