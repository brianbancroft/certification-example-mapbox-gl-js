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

export default calculateY
