import express from 'express'
import {login, signup, logout, signupGoogle} from './auth.controller.js'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.post('/google', signupGoogle)
module.exports = router