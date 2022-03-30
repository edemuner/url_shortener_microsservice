const Express = require('express')
const app = Express()
const connectDB = require('./db')

connectDB()

const PORT = process.env.PORT || 3000

app.use(Express.urlencoded({extended:true}))
app.use(Express.json())

app.use('/api', require('./routes/urls'))
app.use('/api', require('./routes/index'))

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))