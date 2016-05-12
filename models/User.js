const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , uuid = require('node-uuid');

let UserSchema = new Schema({
    _id: { type: String, default: uuid.v4(), unique : true, required : true },
    name: { type: String, unique : true, required : true},
    password: { type: String, required : true},
    admin: Boolean
});

if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = (doc, ret) => delete ret.password && delete ret._id && delete ret.__v && ret;

let User = mongoose.model('User', UserSchema);


module.exports = User;
