const routes = require('express').Router()
const handlers = require('../handlers/orderHandler')

routes.post('/order', handlers.insertOrder)
routes.get('/order', handlers.getOrder)
routes.get('/order/:id', handlers.getUserOrder)
routes.put('/order/update/:id', handlers.updateOrder)
routes.delete('/order/:id', handlers.deleteOrder)


module.exports = routes