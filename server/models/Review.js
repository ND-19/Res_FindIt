const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    bookingId: {
      type: String,
      required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,  
    },
    review: {
        type: String
    },
    averageCostForTwo: {
        type: Number
    }
})


const Review = mongoose.model('review', ReviewSchema);
module.exports = Review