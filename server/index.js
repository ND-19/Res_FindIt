const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const db = process.env.mongoURILocal
const multer = require('multer');
const imgModel = require('./models/Image');
var fs = require('fs');
var path = require('path');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(cors())


app.use("/api/distance", require("./routes/distanceRoute"));
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/users', require('./routes/users'))

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          const dir = `./uploads/${req.params.name}`
          fs.exists(dir, exist => {
          if (!exist) {
            return fs.mkdir(dir, error => cb(error, dir))
          }
          return cb(null, dir)
          })
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now())
        }
    });

var upload = multer({ storage: storage });
app.get('/image/getbyname/:name', (req, res) => {
    
    imgModel.findOne({ restaurantName:req.params.name })
    .then(image => {
        console.log(image)
        res.set("Content-Type", image.contentType);
       res.send( image.data );
    }).catch(err =>{
        console.log(err);
        res.status(500).send('An error occurred', err);
    })
});
app.post('/image/:name', upload.single('image'), (req, res, next) => {
    
    const newImage = new imgModel({
        restaurantName: req.params.name,
        img: {
            data: fs.readFileSync(path.resolve(__dirname + '\\uploads\\' + `${req.params.name}\\` + req.file.filename)),
            contentType: 'image/*'
        }
    })
    newImage.save()
        .then(image => {
            res.json({ msg: "Image upload successful", image })
        })
        .catch(err => {
            console.log(err)
        })


});
app.listen(port, () =>
    console.log(`Server running on port no. ${port} using Nodemon`)
);