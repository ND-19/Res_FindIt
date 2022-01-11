const pg = require('pg')
require('dotenv').config()
const pool = new pg.Pool({
    connectionString: `${process.env.DATABASE_URL}?sslmode=require`,
    "max": 10,
    "idleTimeoutMillis": 30000,
    ssl:{
        rejectUnauthorized: false,
    }
})


async function query(q, p) {
    const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q, p)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}


module.exports = query