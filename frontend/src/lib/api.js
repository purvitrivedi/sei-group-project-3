import axios from 'axios'

const baseUrl = '/api'

// Hikes

export const getAllHikes = () => {
  return axios.get(`${baseUrl}/hikes`)
}