const app = require('./app')
const { PORT } = require('../config/dev')

app.listen(PORT, () => {
    console.log('Serwer is up on port: ' + PORT)
})