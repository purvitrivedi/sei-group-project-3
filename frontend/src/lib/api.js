import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

// Hikes

export const getAllHikes = () => {
  return axios.get(`${baseUrl}/hikes`)
}

export const getSingleHike = id => {
  return axios.get(`${baseUrl}/hikes/${id}`)
}

export const createHike = formData => {
  return axios.post(`${baseUrl}/hikes`, formData, withHeaders())
}

export const deleteHike = id => {
  return axios.delete(`${baseUrl}/hikes/${id}`, withHeaders())
}

export const updateHike = (id, formData) => {
  return axios.put(`${baseUrl}/hikes/${id}`, formData, withHeaders())
}

export const reviewHike = (id, reviewData) => {
  return axios.post(`${baseUrl}/hikes/${id}/reviews`, reviewData, withHeaders())
}

export const deleteHikeReview = (id, reviewId) => {
  return axios.delete(`${baseUrl}/hikes/${id}/reviews/${reviewId}`, withHeaders())
}

export const addHikeToFavorites = (userId, hikeId) => {
  return axios.post(`/api/profiles/${userId}/favorites`, hikeId, withHeaders())
}


// * Auth

export const registerUser = formData => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData)
}




// * Profiles

export const getAllUsers = () => {
  return axios.get(`${baseUrl}/profiles`, withHeaders())
}

export const getUser = userId => {
  return axios.get(`${baseUrl}/profiles/${userId}`, withHeaders())
}

export const editUser = (userId, data) => {
  return axios.put(`${baseUrl}/profiles/${userId}`, data, withHeaders())
}



//* add & remove hikes from profile

export const addCompleted = (userId, hikeId) => {
  return axios.post(`${baseUrl}/profiles/${userId}/completed`, hikeId, withHeaders())
}


export const removeHikeRequest = (userId, linkName, hikeId) => {
  return axios.delete(`${baseUrl}/profiles/${userId}/${linkName}/${hikeId}`, withHeaders())
}


//* member leave group

export const leaveGroupRequest = (groupId, memberId) => {
  return axios.delete(`${baseUrl}/groups/${groupId}/members/${memberId}`, withHeaders())
}


//* profileImageUpload

export const profileImageUpload = (uploadUrl, data) => {
  return axios.post(uploadUrl, data)
}


//* Groups
export const getSingleGroup = groupId => {
  return axios.get(`${baseUrl}/groups/${groupId}`)
}