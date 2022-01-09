const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        required: true
    },
    AvgCostForTwo: {
        type: Number,
        required: true
    },
})

RestaurantSchema.index({ name: 'text', locality: 'text', address: 'text' });
const Restaurant = mongoose.model('turf', RestaurantSchema);
Restaurant.createIndexes();
module.exports = Restaurant