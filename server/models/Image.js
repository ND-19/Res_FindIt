var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);