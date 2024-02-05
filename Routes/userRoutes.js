const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const requireSignIn = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ success: true, ok: true })
})
module.exports = router;