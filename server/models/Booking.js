const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HotelSchema = require('./Hotel').schema
const UserSchema = require('./User').schema

const BookingSchema = new Schema({
    userId: {
        type: String, 
        required: true
    },
    hotelId: {
        type: String,
        required: true
    },
    timing: {
        type: Date,
        required: true
    },
    hotel: {
        type: HotelSchema,
        required: true
    },
    user: {
        type: UserSchema
    },
},{ timestamps: true })

module.exports = Booking = mongoose.model('booking', BookingSchema)