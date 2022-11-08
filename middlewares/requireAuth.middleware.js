import { authService } from '../services/auth.service.js'
import { logger } from '../services/logger.service.js'

function requireAuth(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedUser) return res.status(401).send('Not Authenticated')
  next()
}

function requireAdmin(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedUser.isAdmin) {
    logger.warn(loggedUser.fullName + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}
