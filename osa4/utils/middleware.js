const logger = require('./logger')
const config = require('./config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  const auth = request.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
     const token = auth.substring(7)

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)

      if (decodedToken.id) {
        request.user = await User.findById(decodedToken.id)
      }
    } catch (error) {
      request.user = null
    }
  } else {
    request.user = null
  }
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
    if (error.name === 'CastError') {
      response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
      response.status(400).send({ error: error.message })
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    else if (error.code === 11000) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid or missing token' })
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'})
  }
    else {
      next(error)
    }
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}