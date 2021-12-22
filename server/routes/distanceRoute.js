const express = require("express");
const router = express.Router();
const query = require("../connection")

router.get("/getrestaurants/:city", async (req, res) => {
    try {
        const { rows } = await query('SELECT * FROM restaurants2.restaurant2 WHERE \"city\"=$1 LIMIT 100', [req.params.city])
        res.send(rows)
    } catch (err) {
        console.log('Database ' + err)
    }
});

//Get all the cities in the database
router.get("/getallcities", async (req, res) => {
    try {
        const { rows } = await query('SELECT DISTINCT city FROM restaurants2.restaurant2 ORDER BY city')
        res.send(rows)
    } catch (err) {
        console.log('Database ' + err)
    }
});

//Get nearest 100 restaurants from the specified point
router.get("/getdistance/:point", async (req, res) => {
    try {
        const { rows } = await query('SELECT *,ST_Distance(ST_Transform(p1.geometry,26986),ST_Transform(ST_GeomFromText($1,4326),26986))/1000 AS Distance FROM restaurants2.restaurant2 as p1 ORDER BY distance LIMIT 100', [req.params.point])
        res.send(rows)
    } catch (err) {
        console.log('Database ' + err)
    }
});


router.get("/buffer", async (req, res) => {
    try {
        const rows = await query('SELECT ST_AsGeoJSON(ST_GeomFromText(ST_AsText(ST_Buffer(ST_GeomFromText(\'POINT(72 19)\'), 50, \'quad_segs=8\')))) :: json-> \'coordinates\' AS coordinates')
        // res.send(rows)
        console.log(rows)
    } catch (err) {
        console.log('Database ' + err)
    }
});

//Get all the restaurants within certain radius from the selected restaurant
router.get("/distancewithin/:id/:radius", async (req, res) => {
    try {
        const { rows } = await query('SELECT p1.* FROM restaurants2.restaurant2 as p1 LEFT JOIN restaurants2.restaurant2 as p2 ON ST_DWithin(ST_Transform(p1.geometry,26986),ST_Transform(p2.geometry,26986),$1) WHERE p2.res_id=$2',[parseFloat(req.params.radius)*1000,req.params.id])
        res.send(rows)
        
    } catch (err) {
        console.log('Database ' + err)
    }
});
module.exports = router;