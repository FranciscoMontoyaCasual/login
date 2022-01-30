const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user)
    res.json({
        msg: 'Has logrado acceder a la ruta protegida'
    })
})

module.exports = router