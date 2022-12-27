import axios from "axios";
import { API } from "../../config";

// Register
const register = async (userData) => {
    const response = await axios.post(`${API}/users/register`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login

const login = async (userData) => {
    const response = await axios.post(`${API}/users/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}
// GetUser
const getUser = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(`${API}/users/login`, config)
      return response.data
}

// Password reset request
const resetPassword = async (userData) => {
    const response = await axios.post(`${API}/users/request-mail`, userData).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}


const authService = {
    register,
    logout,
    login,
    getUser,
    resetPassword,
}

export default authService