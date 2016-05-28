'use strict';
const User   = require('../models/User')
	, jwt = require('jsonwebtoken')
	, config = require('../config');

function errorHandler(err){
  if (err && err.name === 'ValidationError') {
    let r = new Array();
    for (let a in err.errors) {
      r.push({
        field: err.errors[a].path,
        type: err.errors[a].kind,
        value: err.errors[a].value,
        message: err.errors[a].message,
      });
    }
    return r;
  }
  return err;
}

const userController = {
  authUser: function (req,res) {
    User
			.findOne({username: req.body.username})
			.then(user => {
				if(user && user.password === req.body.password)
  				return res.json(200, {
  					success: true,
  					message: 'Enjoy your token!',
  					token: jwt.sign(JSON.stringify({mySelf: user.id}), config.secret)
  				});
        else Promisse.rejected();
			})
			.catch(err => {
				return res.json(403,{ success: false, message: 'Authentication failed. Wrong user/password.'});
			});
  },
	hadPermission: function (perm, req, res, next) {
    User.findById(req.decoded.mySelf)
      .then((r)=>{
        if(r.permissions.indexOf(perm)>-1)
          next(req,res);
        else Promisse.rejected();
      })
      .catch((e)=> res.json(403,{ success: false, message: 'You doesn\'t have permission to do it.'}));
	},
  createUser: function(req,res){
      new User(req.body).save()
      .then((r)=>{
        console.log('User '+r.usename+' saved successfully');
        res.json({ success: true });
      })
      .catch((e)=> res.json(501,errorHandler(e)));
  },
  readUser: function (req,res){
    User.findById(req.params.id)
      .then((r)=>{
          res.json(r);
      })
      .catch((e)=> res.json(501,{ success: false, message: 'User didn\'t find.'}));
  },
  updateUser: function (req,res) {
    res.json(404, {message: '#TODO'});
  },
  deleteUser: function (req,res) {
    res.json(404, {message: '#TODO'});
  },
  readUsers: function (req,res) {
    User.find()
    .then((r)=>res.json(200,users))
    .catch((e)=> res.json(501,errorHandler(e)));
  },
  deleteUsers: function (req,res) {
    res.json(404, {message: '#TODO'});
  },
};

module.exports = userController;
