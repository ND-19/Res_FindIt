const express = require("express");
const cors = require("cors")
const db = config.get('mongoURILocal')

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())
app.use(cors())


app.use("/api/distance", require("./routes/distanceRoute"));
app.use('/api/bookings',require('./routes/bookings'))

mongoose.connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))


app.listen(port, () =>
    console.log(`Server running on port no. ${port} using Nodemon`)
);




