const routes = require('express').Router()
const handlers = require('../handlers/menuHandler')

routes.post('/menu', handlers.insertMenu)
routes.get('/menu', handlers.getMenu)
routes.put('/menu/:id', handlers.updateMenu)
routes.put('/users/profile/:id', handlers.updateUser)
routes.delete(  '/menu/:id', handlers.deleteMenu)


module.exports = routes
