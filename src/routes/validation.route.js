const express = require('express')
const passport = require('passport')

const authController = require('./../controllers/auth.controller')

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    if(req.body?.code && req.user?.sub){
        authController.email_verification(req.user.sub, req.body.code)
        .then(response => {
            if(response.status === 'SUCCESS')
                return res.json({ msg: response.msg })

            res.json({ msg: response.err })
        }).catch(err => {
            res.json({
                message: 'Error en la validacion'
            })
        })
    }
})

module.exports = router