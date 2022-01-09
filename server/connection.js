const pg = require('pg')
require('dotenv').config()
const pool = new pg.Pool({"user": process.env.PG_User, 
"database": process.env.PG_Database, 
"password": process.env.PG_Password, 
"host": process.env.PG_Host,
"port": process.env.PG_Port, 
"max": 10, 
"idleTimeoutMillis": 30000 
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