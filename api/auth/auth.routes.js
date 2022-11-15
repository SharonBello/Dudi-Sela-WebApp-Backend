import express from 'express'
import {signin, signup, signout} from './auth.controller.js'

export const authRoutes = express.Router()

authRoutes.post('/signin', signin)
authRoutes.post('/signup', signup)
authRoutes.post('/signout', signout)






