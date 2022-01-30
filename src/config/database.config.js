const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD
})

pool.on('error', (err, client) => {
    console.log('Ha ocurrido un error: ', err)
})

module.exports = pool
