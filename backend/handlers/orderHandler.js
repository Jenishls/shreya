const config = require('../knexfile')
const knex = require('knex')(config)
const auth = require('../middleware/authMiddleware')


const insertOrder = (req, res) => {
    auth.check(req, res)

    knex('order')
        .insert({
            user_id: req.body.user_id,
            title: req.body.menu_id,
            desc: req.body.quantity,
            price: req.body.price,
            status: 'On-process',
        })
        .then(data => {
            res.json({status: true})
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const getOrder = (req, res) => {
    auth.check(req, res)

    knex('order')
        .select('*')
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const getUserOrder = (req, res) => {
    auth.check(req, res)

    knex('order')
        .select('*')
        .where('user_id',req.params.user_id)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            })
        });
}

const updateOrder = (req,res) => {
	auth.check(req,res)

	knex('order')
	.where('id',req.params.id)
	.update({
		user_id: req.body.user_id,
        menu_id: req.body.menu_id,
        quantity: req.body.quantity,
        status req.body.status,
        price: req.body.price
	})
	.then(data => res.json({status:true}))
	.catch(error=>{
		console.log(error)
		res.json({status:flase})
	})
}

const deleteOrder = (req, res) => {
    auth.check(req, res)
    knex('order')
        .where('id', req.params.id)
        .del()
        .then(data => {
            res.json({status: true})

        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "error"
            });
        })
}

module.exports = {
    "insertOrder": inserOrder,
    "getOrder" : getOrder,
    "getUserOrder" : getUserOrder,
    "updateOrder": updateOrder,
    "deleteOrder": deleteOrder
}