import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
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

export default { getAll, create, setToken, remove, update }