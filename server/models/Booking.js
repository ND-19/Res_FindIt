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
    user: {
        type: UserSchema
    },
    time:{
            type: String,
            required: true
    },
    }
)

module.exports = Booking = mongoose.model('booking', BookingSchema)