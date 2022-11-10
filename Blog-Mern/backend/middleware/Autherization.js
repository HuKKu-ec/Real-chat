const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
require('dotenv').config();
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: 'Not autharized' });
  } else {
    const token = authorization.split(' ')[1];
    const { id } = await jwt.verify(token, process.env.SECRET);
    try {
      req.user = await UserModel.findOne({ _id: id }).select('_id');

      next();
    } catch (error) {
      res.status(401).json({ error: 'Not a valid autharized' });
    }
  }
};
module.exports = requireAuth;
