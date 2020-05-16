export const setToken = token => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}

const getPayload = () => { //* either returns the decoded data from token or false
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob(parts[1]))
}

export const isOwner = id => {
  const userId = getPayload().sub
  return userId === id
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000) //* works out the time RIGHT NOW
  return now < payload.exp //* is RIGHT NOW earlier that EXPIRY TIME ON TOKEN
}