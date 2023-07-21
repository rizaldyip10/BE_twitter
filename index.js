const express = require('express')
const db = require('./models')
const cors = require('cors')

const PORT = 2000

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', (req,res) => {
    res.send("this is my API")
})

const {userRouter} = require('./routers')
server.use('/user', userRouter)
server.use(express.static('./public'))

server.listen(PORT, () => {
    db.sequelize.sync({ alter : true})
    console.log(`server running at port : ${PORT}`);
})