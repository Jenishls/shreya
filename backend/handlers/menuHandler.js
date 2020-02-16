const config = require('../knexfile')
const knex = require('knex')(config)
// const auth = require('../middleware/authMiddleware')


const insertMenu = (req, res) => {
    // auth.check(req, res)

    knex('menu')
        .insert({
            user_id: req.body.user_id,
            title: req.body.title,
            desc: req.body.desc,
            img: "dsad",
            price: req.body.price
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

const getMenu = (req, res) => {
    // auth.check(req, res)

    knex('menu')
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

const updateMenu = (req,res) => {
	// auth.check(req,res)

	knex('menu')
	.where('id',req.params.id)
	.update({
		user_id: req.body.user_id,
        title: req.body.title,
        desc: req.body.desc,
        // img req.body.img,
        price: req.body.price
	})
	.then(data => res.json({status:true}))
	.catch(error=>{
		console.log(error)
		res.json({status:flase})
	})
}

const bcrypt = require('bcrypt');

const updateUser = (req, res) => {
    knex('users')
        .where('id', req.params.id)
        .update({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        .then(data => res.json({ status: true }))
        .catch(error => {
            console.log(error)
            res.json({ status: false })
        })

}

const deleteMenu = (req, res) => {
    // auth.check(req, res)
    knex('menu')
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
    "insertMenu": insertMenu,
    "getMenu" : getMenu,
    "updateMenu": updateMenu,
    "updateUser": updateUser,
    "deleteMenu": deleteMenu
}