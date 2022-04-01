const Express = require('express')
const app = Express()
const connectDB = require('./db')
const cors = require('cors')

connectDB()

const PORT = process.env.PORT || 3000

app.use(Express.urlencoded({extended:true}))
app.use(Express.json())
app.use(cors())
app.use(Express.static(__dirname + '/public'))

app.use(require('./routes/index'))
app.use('/api', require('./routes/urls'))

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))