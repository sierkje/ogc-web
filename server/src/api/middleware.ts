import { NextFunction, Request, Response } from 'express'

import { ApiServer } from './server'

export type ApiMiddleware = <T extends object>(
  server: ApiServer<T>,
  options: T
) => (...args: [Request, Response, NextFunction, ...any[]]) => void

const create: ApiMiddleware = function createApiMiddleware(server, options) {
  return function apiMiddleware(req, res, next) {
    const middleware = server.getMiddleware(options)
    middleware(req, res, next)

    next()
  }
}

export default create
