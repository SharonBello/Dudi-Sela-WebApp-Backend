import { logger } from '../services/logger.service.js'

async function log(req, res, next) {
  // logger.info('Sample Logger Middleware')
  next()
}

module.exports = {
  log
}
