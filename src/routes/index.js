const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome!',
        name: req.app.get('pkg').name,
        version: req.app.get('pkg').version,
        description: req.app.get('pkg').description,
        author: req.app.get('pkg').author
    })
})

module.exports = router