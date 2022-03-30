const Express = require('express')
const app = Express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))