const config = require('../knexfile')
const knex = require('knex')(config)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/authMiddleware')

const register = (request,response) => {
  console.log(request.body.name)
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password
  const phone = request.body.phone

  const hashedPassword = bcrypt.hashSync(password, 10);
  knex
    .table('users')
    .insert({
      name: name,
      email: email,
      phone:phone,
      password: hashedPassword,
    })
    .then(data => {
      response.json({
        email: email,
        phone:phone,
        isAdmin:0,
        user_id:data[0],
        status:'true',
        accessToken: jwt.sign({
          email: email
        },'secret_key')
      })
    })
    .catch(error => {
      response.json({
        status: 'false',
      })
    })
}


// Auth handler
const authenticate = (request,response) =>{
  const email = request.body.email;
  const passwordFromJSON = request.body.password;
  knex
    .table('users')
    .first('password','id','isAdmin')
    .where('email', email)
    .then(data => {
      if (!data) {
        response.json({
          status: 'false',
          message: 'User not found.'
        })
      } else {
        const user_id = data.id;
        const password = data.password;
        const isAdmin = data.isAdmin;
        const isMatch = bcrypt.compareSync(passwordFromJSON, password);
        if (isMatch) {
          // password matched
          response.json({
            email: email,
            user_id:user_id,
            isAdmin:isAdmin,
            status:'true',
            accessToken: jwt.sign({
              email: email
            },'secret_key')
          })
        } else {
          response.json({
            status: 'false',
            message: 'user not authenticated'
          })
        }
      }
      
    })
    .catch(error => {
      response.json({
        status: 'fail',
      })
    })
}

const checkAuth = (request,response) =>{
  check = middleware.check(request,response)
  return;
}

module.exports = {
  "register": register,
  "authenticate": authenticate,
  "checkAuth": checkAuth 
}