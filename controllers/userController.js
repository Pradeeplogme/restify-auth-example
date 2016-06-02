"use strict";
const User   = require("../models/User")
, jwt = require("jsonwebtoken")
, config = require("../config")
,	crypto = require("crypto")
, Q = require("q");

function errorHandler(err){
	if (err && err.name === "ValidationError") {
		let r = new Array();
		for (let a in err.errors) {
			r.push({
				field: err.errors[a].path
				, type: err.errors[a].kind
				, value: err.errors[a].value
				, message: err.errors[a].message
			});
		}
		return r;
	}
	return err;
}

const generateSalt = function(length=32) {
		const deferred = Q.defer();
		crypto.randomBytes(length, function(err, buf) {
			if(err) deferred.reject(new Error(err));
			deferred.resolve(buf.toString());
		});
		return deferred.promise;
	}
	, hashPassword = function(password, salt) {
		const deferred = Q.defer();
		crypto.pbkdf2(password, salt, 12500, 512, "sha512", (err, key) => {
			if(err) deferred.reject(new Error(err));
			deferred.resolve(key.toString("hex"));
		});
		return deferred.promise;
	}
	, comparePassword = function(newPassword, oldPassword, salt) {
		var deferred = Q.defer();
		hashPassword(newPassword, salt).then(function(hash) {
			if(hash === oldPassword) deferred.resolve();
			else deferred.reject("Invalid password.");
		});
		return deferred.promise;
	};
const userController = {

	authUser: function (req,res) {
		let _u;
		User
		.findOne({username: req.body.username})
		.then(user=>{
			_u = user;
			return user;
		})
		.then(user=>comparePassword(req.body.password, user.password, user.salt))
		.then(()=>{
			return res.json(200, {
				success: true
				, message: "Enjoy your token!"
				, token: jwt.sign(JSON.stringify({mySelf: _u.id}), config.jwtSecrect)
			});

		})
		.catch(() => {
			return res.json(403,{ success: false, message: "Authentication failed. Wrong user/password."});
		});
	}
	, hadPermission: function (perm, req, res, next) {
		const deferred = Q.defer();
		User.findById(req.decoded.mySelf)
		.then((r)=>{
			if(r.permissions.indexOf(perm)>-1)
				next(req,res);
			else deferred.reject(new Error());
		})
		.catch(()=> res.json(403,{ success: false, message: "You doesn\"t have permission to do it."}));
	}
	, createUser: function(req,res){
		let data = req.body;
		console.log(data);
		generateSalt(32).then(salt=>{
			data.salt = salt;
			hashPassword(data.password, data.salt).then(newPassword => {
				data.password = newPassword;
				new User(data).save()
				.then(()=>{
					res.json(200, { success: true, message: "User saved successfully"});
				}).catch((e)=> res.json(501,errorHandler(e)));
			}).catch((e)=> res.json(501,errorHandler(e)));
		}).catch((e)=> res.json(501,errorHandler(e)));



	}
	, readUser: function (req,res){
		User.findOne({ username: req.params.id })
		.then((r)=>{
			res.json(r);
		})
		.catch(()=> res.json(501,{ success: false, message: "User didn\"t find."}));
	}
	, updateUser: function (req,res) {
		res.json(404, {message: "#TODO"});
	}
	, deleteUser: function (req,res) {
		User
		.findOneAndRemove({ username: req.params.id })
		.then(res.json(200, { success: true, message: "User removed."}))
		.catch(res.json(501, { success: false, message: "User didn\"t find."}));
	}
	, readUsers: function (req,res) {
		User.find()
		.then((r)=>res.json(200,r))
		.catch((e)=> res.json(501,errorHandler(e)));
	}
	, deleteUsers: function (req,res) {
		/*User
		.findAndRemove()
		.then(res.json(200, { success: true, message: "User removed."}))
		.catch(res.json(501, { success: false, message: "User didn\"t find."}));*/
		res.json(404,{message:"#TODO"});
	}
};

module.exports = userController;
