import Cryptr from 'Cryptr'
import bcrypt from 'bcrypt'
import {userService} from '../user/user.service.js'
const cryptr = new Cryptr(process.env.SECRET1 || 'Dudi-Sela-1234')

async function login(email, password) {
    const user = await userService.getByEmail(email)

    if (!user) return Promise.reject('Invalid email or password')
    // un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({ email, password, fullname, imgUrl }) {
    const saltRounds = 10
    if (!email || !password || !fullname) return Promise.reject('Missing required signup information')
    const userExist = await userService.getByemail(email)
    if (userExist) return Promise.reject('email already taken')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, fullname, imgUrl })
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