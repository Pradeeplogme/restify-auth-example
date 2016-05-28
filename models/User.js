const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , uniqueValidator = require('mongoose-unique-validator')
    , validate = require('mongoose-validator')
    , usernameValidator = [
      validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
      })]
    , fullnameValidator = [
        validate({
          validator: 'isAlphanumeric',
          passIfEmpty: true,
          message: 'Name should contain alpha-numeric characters only'
        })]
    , emailValidator = [
      validate({
        validator: 'isEmail',
        message: 'E-mail must be valid.'
      })
    ];
let UserSchema = new Schema({
    username: { type: String, unique : true, required : true, validate: usernameValidator },
    email: { type: String, unique : true, required : true, validate: emailValidator },
    password: { type: String, required : true },
    fullname: { type: String, required : true, min:10, validade: fullnameValidator },
    picture: { type: String },
    permissions: { type: Array },
});

if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = (doc, ret) => delete ret.password && delete ret._id && delete ret.__v && ret;
UserSchema.plugin(uniqueValidator);
mongoose.Promisse = global.Promisse;
let User = mongoose.model('User', UserSchema);


module.exports = User;
