import Cryptr from 'Cryptr'
import bcrypt from 'bcrypt'
import {userService} from '../user/user.service.js'
import {logger} from '../../services/logger.service.js'
const cryptr = new Cryptr(process.env.SECRET1 || 'Dudi-Sela-1234')

async function login(userName, password) {

    logger.debug(`auth.service - login with username: ${userName}`)
    const user = await userService.getByUsername(userName)

    if (!user) return Promise.reject('Invalid username or password')
    // un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({ userName, password, fullname, imgUrl }) {
    const saltRounds = 10
    logger.debug(`auth.service - signup with username: ${userName}, fullname: ${fullname}`)
    if (!userName || !password || !fullname) return Promise.reject('Missing required signup information')
    const userExist = await userService.getByUsername(userName)
    if (userExist) return Promise.reject('Username already taken')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ userName, password: hash, fullname, imgUrl })
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedUser = JSON.parse(json)
        return loggedUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}


module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}