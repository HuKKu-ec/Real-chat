const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

//signup validation
UserSchema.statics.signup = async function (email, password) {
  const exist = await this.findOne({ email });

  if (email == '' || password == '') {
    throw Error('The password and email must be filled');
  }
  if (exist) {
    throw Error('Email is already exist');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid format');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('password is not strong ');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashPassword });
  return user;
};

//login validation

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (email == '' || password == '') {
    throw Error('The password and email must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not in valid format');
  }
  if (!user) {
    throw Error('There is no account with this email id');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Password is incorrect');
  }
  return user;
};

module.exports = mongoose.model('User', UserSchema);
