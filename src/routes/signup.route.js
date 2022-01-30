const express = require('express')
const passport = require('passport')
const jsonwebtoken = require('jsonwebtoken')

const router = express.Router()

/*router.post('/', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/',
    session: false
}))*/

router.post('/', function(req, res){
    passport.authenticate('signup', { session: false }, (err, user) => {
        if(!user)
            return res.json({
                message: `El usuario con ese email ya existe.`
            })

        const jwt = jsonwebtoken.sign({
            sub: user.user_id
        }, 'my_secert_key')

        return res.json({
            token: jwt
        })

    })(req, res)
})

module.exports = router
