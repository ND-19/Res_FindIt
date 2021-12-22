const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HotelSchema = new Schema({
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
    phoneNo: {
        type: String,
        required: true
    },
    costPerHour: {
        type: Number,
        required: true
    },
    dateAdded:{
        type:Date,
        default:Date.now
    },
    ownerId: {
        type: String,
        required: true
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    fileURL:{
        type: String
    }
})

HotelSchema.index({ name: 'text', locality: 'text', address: 'text' });
const Hotel = mongoose.model('turf', HotelSchema);
Hotel.createIndexes();
module.exports = Hotel