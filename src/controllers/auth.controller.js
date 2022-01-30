const pool = require('./../config/database.config')
const authController = {}

authController.signup = async function(name, last_name, email, password){
    try{
        const res = await pool.query('select main.ef_signup($1, $2, $3, $4, $5)', 
        [name, last_name, email, password, 1])

        return res.rows[0]?.ef_signup
    }catch(err){
        throw err
    }
}

authController.email_verification = async function(user_id, code){
    try{
        const res = await pool.query('select main.ef_email_verification($1, $2)', [user_id, code])

        return res.rows[0]?.ef_email_verification
    }catch(err){
        throw err
    }
}

module.exports = authController
