const express = require('express')
const userRoutes = require('./routes/usersRoutes')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
/*
app.use(bodyParser.urlencoded({ extended: true }))
*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


userRoutes(app)

//app.get('/', (req, res) => res.send('Olá mundo'))

app.listen(port, () => console.log('Api rodando na porta 3000'))


