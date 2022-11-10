const UserSchema = require('../model/UserModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
  return token;
};
// signup
const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//login
const getUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser, getUserLogin };
