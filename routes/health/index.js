'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // Return a api health check message
    return { status: 200, message: 'This service is healthy' }
  })
}
