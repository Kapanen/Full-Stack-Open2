import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('token set to:', token)
}



const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
  const create = async (newObject) => {
    const config = { headers: { Authorization: token } }

    console.log('headers:', config)

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default { getAll, create, setToken }