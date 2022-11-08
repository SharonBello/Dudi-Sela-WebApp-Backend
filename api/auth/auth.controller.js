import { authService } from './auth.service'
import { userService } from '../user/user.service'
import Cryptr from 'Cryptr'

const cryptr = new Cryptr(process.env.SECRET1 || 'Dudi-Sela-1234')

async function login(req, res) {
    const { userName, password } = req.body

    try {
        const user = await authService.login(userName, password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signupGoogle(req, res) {
    try {
        const credentials = req.body
        console.log('auth controller line 26')
        let userExisting = await userService.checkIfGoogleAccount(credentials) 
        if(!userExisting) {
            console.log('!userExisting')    
            userService.add(credentials)
        }
        const user = await authService.login(credentials.userName, credentials.password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function signup(req, res) {
    try {
        const credentials = req.body
        // Never log passwords
        const account = await authService.signup(credentials)
        const user = await authService.login(credentials.userName, credentials.password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout,
    signupGoogle
}