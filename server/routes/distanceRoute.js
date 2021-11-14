const express = require("express");
const router = express.Router();
const query = require("../connection")
// const client = require("../connection")

// router.get("/getdistance/:city", (req, res) => {
//     client.connect()
//     .then(()=> console.log("Connected Successfully"))
//     .then(()=> client.query("SELECT ST_Distance(ST_Transform(p1.geometry,26986),ST_Transform(ST_GeomFromText('POINT(72.8258 19.1059)',4326),26986))/1000 AS Distance FROM restaurants2.restaurant2 as p1 WHERE \"city\"=$1 ORDER BY distance LIMIT 100",[req.params.city]))
//     .then(results=> console.log(results))
//     .catch(e=>console.log(e))
// });
// router.get("/getdistance/:city", async (req, res) => {
//     try {
//         const { rows } = await query('SELECT *,ST_Distance(ST_Transform(p1.geometry,26986),ST_Transform(ST_GeomFromText(\'POINT(72.8258 19.1059)\',4326),26986))/1000 AS Distance FROM restaurants2.restaurant2 as p1 WHERE \"city\"=$1 ORDER BY distance LIMIT 100', [req.params.city])
//         res.send(rows)
//     } catch (err) {
//         console.log('Database ' + err)
//     }
// });
router.get("/buffer", async (req, res) => {
    try {
        const rows = await query('SELECT ST_AsGeoJSON(ST_GeomFromText(ST_AsText(ST_Buffer(ST_GeomFromText(\'POINT(72 19)\'), 50, \'quad_segs=8\')))) :: json-> \'coordinates\' AS coordinates')
        // res.send(rows)
        console.log(rows)
    } catch (err) {
        console.log('Database ' + err)
    }
});
module.exports = router;