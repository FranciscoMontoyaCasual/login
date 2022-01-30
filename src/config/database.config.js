const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'login',
    user: 'postgres',
    password: '123'
})

pool.on('error', (err, client) => {
    console.log('Ha ocurrido un error: ', err)
})

module.exports = pool
