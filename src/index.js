const app = require('./config/server.config')

app.listen(app.get('port'), () => {
    console.log(`Server runnning on port ${app.get('port')}!`)
})
