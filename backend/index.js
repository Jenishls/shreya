const Express = require('express')
const app = new Express()
const cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('./routes/route_users')
const auth = require('./routes/route_auth')

app.use(cors())
app.use(bodyParser.json())

app.use(Express.urlencoded({ extended: false }));
app.use(Express.static('public'));
app.use("/public", Express.static(__dirname + '/public'));

app.use('/api/auth', auth)
app.use('/api/users', users)


app.listen(7000, () => {
    console.log('Server running on 7000')
})