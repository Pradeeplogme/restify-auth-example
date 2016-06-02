const mongoose = require("mongoose")
	, 	Schema = mongoose.Schema
	, 	uniqueValidator = require("mongoose-unique-validator")
	,	validate = require("mongoose-validator")
	, usernameValidator = [
		validate({
			validator: "isAlphanumeric"
			, passIfEmpty: true
			, message: "Name should contain alpha-numeric characters only"
		})]
	, fullnameValidator = [
		validate({
			validator: "isAlphanumeric"
			, passIfEmpty: true
			, message: "Name should contain alpha-numeric characters only"
		})]
	, emailValidator = [
		validate({
			validator: "isEmail"
			, message: "E-mail must be valid."
		})
	];
let userSchema = new Schema({
	username: { type: String, unique : true, required : true, validate: usernameValidator }
	, email: { type: String, unique : true, required : true, validate: emailValidator }
	, password: { type: String, required : true }
	, salt: { type: String }
	, fullname: { type: String, required : true, min:10, validade: fullnameValidator }
	, picture: { type: String }
	, permissions: { type: Array }
	, created_at: Date
	, updated_at: Date
});

userSchema.pre("save", function(next) {
	let currentDate = new Date();
	this.updated_at = currentDate;
	if (!this.created_at)
		this.created_at = currentDate;
	next();
});

if (!userSchema.options.toJSON) userSchema.options.toJSON = {};
userSchema.options.toJSON.transform = (doc, ret) => delete ret.password && delete ret.salt && delete ret._id && delete ret.__v && ret;
userSchema.plugin(uniqueValidator);
mongoose.Promisse = global.Promisse;
let User = mongoose.model("User", userSchema);


module.exports = User;
