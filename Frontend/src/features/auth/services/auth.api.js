import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,   // so the cookie gets sent/received
})

export const registerUser = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password })
    return response.data
}

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
}

export const logoutUser = async () => {
    const response = await api.get('/auth/logout')
    return response.data
}

export const getMe = async () => {
    const response = await api.get('/auth/get-me')
    return response.data
}
