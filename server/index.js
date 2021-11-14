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

// app.get("/getdistance/:city", async (req, res) => {
//     try {
//         const { rows } = await query('SELECT res_id,latitude,longitude,ST_Distance(ST_Transform(p1.geometry,26986),ST_Transform(ST_GeomFromText(\'POINT(72.8258 19.1059)\',4326),26986))/1000 AS Distance FROM restaurants2.restaurant2 as p1 WHERE \"city\"=$1 ORDER BY distance LIMIT 100', [req.params.city])
//         res.send(rows)
//     } catch (err) {
//         console.log('Database ' + err)
//     }
// });

// app.get("/getdistance/:city", (req, res) => {
//     client.connect()
//         .then(() => console.log("Connected Successfully"))
//         .then(() => client.query("SELECT ST_Distance(ST_Transform(p1.geometry,26986),ST_Transform(ST_GeomFromText('POINT(72.8258 19.1059)',4326),26986))/1000 AS Distance FROM restaurants2.restaurant2 as p1 WHERE \"city\"=$1 ORDER BY distance LIMIT 100", [req.params.city]))
//         .then(results => res.send(results))
//         .then(() => client.end())
//         .catch(e => console.log(e))

// });

app.listen(port, () =>
    console.log(`Server running on port no. ${port} using Nodemon`)
);
