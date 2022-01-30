const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const authController = require('../controllers/auth.controller')
const sendController = require('./../controllers/send.controller')

module.exports = function(){
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true   
    }, function(req, email, password, done){
        const { name, last_name } = req.body

        authController
            .signup(name, last_name, email, password)
            .then(async res => {
                if(res.status === 'SUCCESS'){
                    await sendController.sendValidationCode(res.email, res.code)
                    
                    return done(null, res)
                }
                
                done(null, false)
            }).catch(err => console.log(err))

    }))

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'my_secert_key'
    }, function(jwt_payload, done){

        //TODO: realizar la validación necesaria para dejar acceder al usuario
        // a la ruta segura
        done(null, jwt_payload)
    }))

}
