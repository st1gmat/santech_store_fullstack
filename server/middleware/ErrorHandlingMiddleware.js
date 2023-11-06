const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) { // ошибка, запрос, ответ, функция next, вызвав которую мы передадим управление следущему миддлвейру 
    if(err instanceof ApiError) { // если класс ошибки ApiError, то тогда на клиент возвращаем ответ со статус кодом, получаемой из ошибки
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Unexpected error!"})
}