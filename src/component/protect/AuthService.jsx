import axios from "axios";
import { config } from "../../config/Config";
import { jwtDecode } from "jwt-decode";

export const login = async (values) => {
  try {
    const response = await axios.post(`${config.userApi}/login`, values);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const { userType } = jwtDecode(token);
    return userType;
  } catch (e) {
    return null;
  }
};
