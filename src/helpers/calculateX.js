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

export default calculateX
