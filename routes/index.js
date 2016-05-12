'use strict'

const User   = require('../models/User'),
			jwt = require('jsonwebtoken'),
			config = require('../config');

function isAuthenticated(req, res, next) {

	const token = req.query.token || req.headers['authorization'];
	if (token) {
     jwt.verify(token, config.secret, (err, decoded) => {
			 if (err) return res.json({ success: false, message: 'Failed to authenticate token.' });
			 req.decoded = decoded;
			 next();
     });
   } else
     return res.status(403).send({
         success: false,
         message: 'No token provided.'
     });
}

function isAdmin(req, res, next) {
   if (!req.decoded.admin)
     return res.status(403).send({
         success: false,
         message: 'No token provided.'
     });
		 next();
}

module.exports = function(app) {

	app.post('/user', isAuthenticated, isAdmin, function(req, res) {

		/*User.remove({ name: 'admin2' }, function (err) {
			if (err) return handleError(err);
		});*/

		var nick = new User({
			name: req.body.username,
			password: req.body.password,
			admin: false
		});

		nick.save(function(err) {
			if (err) throw err;

			console.log('User saved successfully');
			res.json({ success: true });
		});
	});

	app.del('/users', isAuthenticated, isAdmin, (req, res) =>
		User.remove({name: {'$ne':req.decoded.name }})
		.then(()=>
			res.send(400, {status: 400, data: null, message: req.decoded.name }))
		.catch((err)=>
			res.json({ success: false, message: 'Error:'+err }).bind(res, err))
		);

	app.del('/user/:name', isAuthenticated, isAdmin, (req, res) =>
		User.remove({name: name})
		.then(()=>
			res.json({ success: true, message: 'User '+name+' removed.' }).bind(res, name))
		.catch((res,err)=>
			res.json({ success: false, message: 'Error:'+err }).bind(res, err))
		);


	app.get('/users', isAuthenticated, (req, res) =>
	User.find({},(err, users) =>
	res.json(users)));

	app.get('/', isAuthenticated, (req, res) =>
		res.send("Welcome to the Restify Authentication Exemple"));

	app.post('/authme', (req, res) => {
		console.log(req.body.username);
		User
			.findOne({name: req.body.username})
			.then((user) => {
				if(!user || user.password !== req.body.password) Promisse.rejected();
				res.json({
					success: true,
					message: 'Enjoy your token!',
					user: user,
					token: jwt.sign(JSON.stringify(user), config.secret)
				});
			})
			.catch(
				(err) =>
				res.json({ success: false, message: 'Authentication failed. Wrong user/password.' })
			);
	});

	app.get


}
