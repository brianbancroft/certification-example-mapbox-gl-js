exports.handler = async (event, _context, callback) => {
  if (event.httpMethod !== 'POST') {
    return callback(null, { statusCode: 405, body: 'Method Not Allowed' })
  }

  const coreData = {
    initialxmin: -112.104973,
    initialymin: 56.788894,
    initialxmax: -112.073994,
    initialymax: 56.804951,
  }

  const generateTheta = () => (Date.now() / 3600) % 360 // (0, θ, 360]

  function offsetTheta(theta, offset) {
    if (theta + offset > 360) {
      return theta + offset - 360
    } else if (theta + offset < 0) {
      return 360 + theta + offset
    } else {
      return theta + offset
    }
  }

  const calculateX = ({ theta, xmin, xmax }) => {
    if (theta < 90) {
      return xmin
    } else if (theta >= 90 && theta < 180) {
      return xmin + (xmax - xmin) * ((theta - 90) / 90)
    } else if (theta >= 180 && theta < 270) {
      return xmax
    } else if (theta >= 270 && theta <= 360) {
      return xmax - ((xmax - xmin) * (theta - 270)) / 90
    } else throw Error(`Angle outside of bounds ', ${theta}`)
  }

  const calculateY = ({ theta, ymin, ymax }) => {
    if (theta < 90) {
      return ymin + (ymax - ymin) * (theta / 90)
    } else if (theta >= 90 && theta < 180) {
      return ymax
    } else if (theta >= 180 && theta < 270) {
      return ymax - ((ymax - ymin) * (theta - 180)) / 90
    } else if (theta >= 270 && theta <= 360) {
      return ymin
    } else throw Error(`Angle outside of bounds ', ${theta}`)
  }

  const payload = JSON.parse(event.body)

  const id = payload?.id
  const thetaOffset = payload?.thetaOffset
  const radialModifier = payload?.radialModifier

  if (!id) return { statusCode: 400, body: 'Missing parameter "id"' }
  if (!thetaOffset)
    return { statusCode: 400, body: 'Missing parameter "thetaOffset"' }
  if (!radialModifier)
    return { statusCode: 400, body: 'Missing parameter "radialModifier"' }

  if (radialModifier < 0.5 || radialModifier > 1)
    return { statusCode: 400, body: 'Invalid parameter radialmodifier' }
  if (thetaOffset > 360 || thetaOffset < 0)
    return { statusCode: 400, body: 'Invalid parameter theta offset' }

  const { initialxmin, initialymin, initialxmax, initialymax } = coreData

  const xRadius = (initialxmax - initialxmin) / 2
  const yRadius = (initialymax - initialymin) / 2
  const centerPointx = initialxmin + xRadius
  const centerPointy = initialymin + yRadius

  const xmin = centerPointx - xRadius * radialModifier
  const xmax = centerPointx + xRadius * radialModifier
  const ymin = centerPointy - yRadius * radialModifier
  const ymax = centerPointy + yRadius * radialModifier

  //
  const theta = offsetTheta(generateTheta(), thetaOffset)

  const x = calculateX({ theta, xmax, xmin })
  const y = calculateY({ theta, ymin, ymax })

  const data = {
    id,
    position: [x, y],
  }

  return { statusCode: 200, body: JSON.stringify(data) }
}
