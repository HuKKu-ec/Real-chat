const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getUser, getUserLogin } = require('../controller/UserController');
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());

router.post('/signup', getUser);
router.post('/login', getUserLogin);
module.exports = router;
