import { UserModel } from "../models/user";
import axios from "../configs/axios";

interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  duration: string;
  statusCode: number;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("https://homecare-pro.onrender.com/users/sign_in", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getUserByToken = async (): Promise<UserModel> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      
      if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      } else {
        throw new Error("No access token found in localStorage");
      }
      
      const response = await axios.get("https://homecare-pro.onrender.com/users/get_user_profile");
  
      const userData: UserModel = response?.data;
      return userData;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  };

export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const response = await axios.post("/auth/user/refresh-token", {
      refresToken: refreshToken,
    });

    if (response.data && response.data.accessToken) {
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken || refreshToken, // Use new refresh token if provided, otherwise keep the old one
      };
    }
    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
