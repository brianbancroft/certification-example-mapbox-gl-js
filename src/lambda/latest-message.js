const { lorem } = require('faker')

exports.handler = async (event, _context, callback) => {
  return { statusCode: 200, body: lorem.sentence() }
}
