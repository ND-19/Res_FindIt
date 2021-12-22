const pg = require('pg')
const config = require('config')
const mongoose = require('mongoose')

const pool = new pg.Pool(config.get('postgresData'))


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