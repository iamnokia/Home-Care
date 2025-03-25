import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://homecare-pro.onrender.com",
  headers: {
    "Content-Type": "application/json",
  }
});

// Add authorization header to requests if token exists
const updateAuthHeader = () => {
  try {
    const storedTokens = JSON.parse(localStorage.getItem('authToken') || "");
    if (storedTokens?.accessToken) {
      axiosInstance.defaults.headers.common["Authorization"] = storedTokens.accessToken;
    }
  } catch (error) {
    console.error("Error setting auth header:", error);
  }
};

// Initial setup of auth headers
updateAuthHeader();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add CORS headers to help with cross-origin requests
    if (config.headers) {
      // For development environments - these won't fix CORS on the server side,
      // but can help with certain proxy setups
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    // Get the original request config
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (expired token)
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get the refresh token from local storage
        const storedTokens = JSON.parse(localStorage.getItem('authToken') || "");
        
        if (!storedTokens?.refreshToken) {
          throw new Error("No refresh token available");
        }
        
        // Set the refresh token in the request header
        const refreshConfig = {
          headers: {
            "Authorization": storedTokens.refreshToken
          }
        };
        
        // Request a new token
        const res = await axios.post(
          "https://homecare-pro.onrender.com/contact/refreshToken", 
          {}, // Empty body
          refreshConfig
        );
        
        // Check if we got a valid response with tokens
        if (!res?.data?.access_token || !res?.data?.refresh_token) {
          throw new Error("Invalid token refresh response");
        }
        
        // Format the new tokens
        const newAccessToken = "Bearer " + res.data.access_token;
        const newRefreshToken = "Bearer " + res.data.refresh_token;
        
        // Update the tokens in local storage
        localStorage.setItem(
          'authToken',
          JSON.stringify({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );
        
        // Update the authorization headers
        originalRequest.headers.Authorization = newAccessToken;
        axiosInstance.defaults.headers.common["Authorization"] = newAccessToken;
        
        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Token refresh failed:", error);
        
        // Handle the session expiration
        if (window.confirm("Session Expired, You need to logout")) {
          localStorage.clear();
          window.location.href = '/';
        }
        
        return Promise.reject(error);
      }
    }
    
    // Handle CORS errors more specifically
    if (error.message === "Network Error") {
      console.error("CORS or Network Error. Check server configuration or use a proxy in development.");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;