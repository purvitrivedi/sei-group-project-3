import axios from 'axios'

const baseUrl = '/api'

// Hikes

export const getAllHikes = () => {
  return axios.get(`${baseUrl}/hikes`)
}


export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/register`, formData)
}