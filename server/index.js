require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const  router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const { log } = require('console')
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.get('/',(req, res) => {res.status(208).json({message:'WoW'})})

const start = async () => // функция запуска сервака
{
    try{
        await sequelize.authenticate() // функция для проверки что с подключением все ок
        await sequelize.sync() // таблица будет создана если еще не существует
        app.listen(PORT,()=> console.log(`sever run on ${PORT}`))

    }
    catch(e){
        console.log(e)
    }
}


app.use(errorHandler)
start()