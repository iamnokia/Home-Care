import { UserModel } from "../models/user";
import axios from "../configs/axios";

interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

/**
 * Login function that posts credentials to the API
 * @param email User's email
 * @param password User's password
 * @returns LoginResponse with tokens and user data
 */
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("/users/sign_in", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

/**
 * Gets user profile using the stored authentication token
 * @returns UserModel with user profile data
 */
export const getUserByToken = async (): Promise<UserModel> => {
  try {
    // Get the stored auth token
    const authTokenString = localStorage.getItem("accessToken");
    
    if (!authTokenString) {
      throw new Error("No authentication token found");
    }
    
    const authToken = JSON.parse(authTokenString);
    
    // Set authorization header
    axios.defaults.headers.common["Authorization"] = authToken.accessToken;
    
    // Make the API call to get user profile
    const response = await axios.get("/users/get_user_profile");
    
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Invalid user data received");
    }
  } catch (error) {
    console.error("Error getting user by token:", error);
    throw error;
  }
};

export const refreshAuthToken = async () => {
  try {
    // Get the stored auth information from localStorage
    const authTokenString = localStorage.getItem("authToken");
    
    if (!authTokenString) {
      throw new Error("No authentication token found");
    }
    
    const authToken = JSON.parse(authTokenString);
    
    // Extract the actual refresh token (removing "Bearer " if present)
    const refreshToken = authToken.refreshToken.startsWith("Bearer ") 
      ? authToken.refreshToken.substring(7) 
      : authToken.refreshToken;
    
    // Make the API call with the refresh token in the request body
    const response = await axios.post(
      "/users/refresh-token", 
      { 
        token: refreshToken 
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
    if (response.data && response.data.access_token) {
      const newAuthData = {
        accessToken: "Bearer " + response.data.access_token,
        refreshToken: response.data.refresh_token ? 
          "Bearer " + response.data.refresh_token : authToken.refreshToken,
      };
      
      // Update the token in localStorage
      localStorage.setItem("authToken", JSON.stringify(newAuthData));
      
      return newAuthData;
    }
    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};