import { authService } from '../services/auth.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, () => {
    if (!req.cookies) return next()
    const loggedUser = authService.validateToken(req.cookies.loginToken)

    if (loggedUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.loggedUser = loggedUser
    }
    next()
  })
}

module.exports = setupAsyncLocalStorage

