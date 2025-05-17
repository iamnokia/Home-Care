// src/App.tsx
import { Box } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import RoutesComponent from "./routes";
import { loginSuccess, loginFailed } from "./store/authenticationSlice";
import LoginDialog from "./layout/components/dialog-login"; // Adjust import path as needed

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  interface AuthToken {
    accessToken: string;
    refreshToken: string;
  }

  // Check for login parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === 'true') {
      setLoginDialogOpen(true);
      // Clean up the URL
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  const handleLoginWithToken = async () => {
    try {
      const authTokenString = localStorage.getItem("accessToken");
      if (!authTokenString) {
        throw new Error("No auth token found");
      }

      const authToken: AuthToken = JSON.parse(authTokenString);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken.accessToken}`;

      const resGetData = await axios.get("/users/get_user_profile");
      dispatch(loginSuccess(resGetData.data));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        await handleTokenRefresh();
      } else {
        console.error("Login failed:", err);
        dispatch(loginFailed());
        localStorage.removeItem("authToken");
      }
    }
  };

  const handleTokenRefresh = async () => {
  try {
    const authTokenString = localStorage.getItem("authToken");
    if (!authTokenString) {
      throw new Error("No auth token found for refresh");
    }

    const authToken: AuthToken = JSON.parse(authTokenString);
    
    // The API expects the refresh token in the request body as { token: "your-refresh-token" }
    // Not in the Authorization header
    const refreshToken = authToken.refreshToken.startsWith("Bearer ")
      ? authToken.refreshToken.substring(7)
      : authToken.refreshToken;
      
    const res = await axios.post("/users/refresh-token", {
      token: refreshToken
    });
    
    const newAccessToken = res.data.access_token;
    // Get the new refresh token if provided, otherwise keep the old one
    const newRefreshToken = res.data.refresh_token || authToken.refreshToken;

    const newAuthToken: AuthToken = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    localStorage.setItem("authToken", JSON.stringify(newAuthToken));
    axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

    // Retry the original request
    const resGetData = await axios.get("/users/get_user_profile");
    dispatch(loginSuccess(resGetData.data));
  } catch (err) {
    console.error("Token refresh failed:", err);
    dispatch(loginFailed());
    localStorage.removeItem("authToken");
  }
};

  // Check for authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("authToken")) {
        await handleLoginWithToken();
      }
    };
    
    checkAuth();
  }, []);

  // Configure global axios defaults
  useEffect(() => {
    // Set base URL
    axios.defaults.baseURL = "https://homecare-pro.onrender.com";
    
    // Set default headers
    axios.defaults.headers.post["Content-Type"] = "application/json";
    
    // Set request timeout
    axios.defaults.timeout = 15000;
    
    // Add request interceptor for handling tokens
    axios.interceptors.request.use(
      (config) => {
        const authTokenString = localStorage.getItem("authToken");
        if (authTokenString) {
          const authToken = JSON.parse(authTokenString);
          config.headers.Authorization = `Bearer ${authToken.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor for handling token expiration
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        
        // If the error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await handleTokenRefresh();
            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, redirect to login
            dispatch(loginFailed());
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }, []);

  // Close login dialog handler
  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  return (
    <Box>
      <RoutesComponent />
      <LoginDialog open={loginDialogOpen} onClose={handleCloseLoginDialog} />
    </Box>
  );
}

export default App;