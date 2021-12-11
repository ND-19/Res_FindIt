const express = require("express");
const app = express();
const cors = require("cors")
const port = process.env.PORT || 5000;
// const {Client} = require('pg');
// const client = new Client({
//     user: "postgres",
//     password: "1234",
//     host: "localhost",
//     port: 5433,
//     database: "zomato2",
// });

const distanceRoute = require("./routes/distanceRoute");
app.use(express.json())
app.use(cors())
app.use("/api/distance", distanceRoute);


app.listen(port, () =>
    console.log(`Server running on port no. ${port} using Nodemon`)
);
