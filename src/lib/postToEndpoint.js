import { post as axiosPost } from 'axios'

const post = (endpoint, params) => {
  console.log(process.env, process.env.NODE_ENV === 'development')

  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9000/.netlify/functions/${endpoint}`
      : `/.netlify/functions/${endpoint}`

  return axiosPost(url, params)
}
export default post
