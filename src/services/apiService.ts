import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { MarketReportResponse } from "../types/types";

// Define API method types
type ApiMethod = "get" | "post" | "put" | "delete";

// Define API response type
interface ApiResponse<T = any> {
  response?: T;
  code?: number;
  message?: any;
}

// Define User Payload Types (example)
interface LoginPayload {
  username: string;
  password: string;
}

interface RegistrationPayload {
  email: string;
  password: string;
}

// Platform URL from environment variables
const platform_url =
  import.meta.env.REACT_APP_PLATFORM_URL || "/market-dashboard";
// Create Axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "https://dev.astranest.ai",
  timeout: 120000, // 120 seconds timeout
});

// Request interceptor to add headers or log request details
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token && config.url !== "/uam/login") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response || error.message);
  }
);

// Generic API request function
const apiRequest = async <T>(
  method: ApiMethod,
  url: string,
  data: any = null,
  responseType: "json" | "blob" = "json"
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
      responseType,
    });

    if (responseType === "json") {
      if (response?.data?.code === 200) {
        return response.data;
      } else {
        return {
          response: response.data
        };
      }
    } else {
      return {response: response.data};
    }
  } catch (error: any) {
    if (error?.status === 401) {
      toast.error("Session expired, logging out.");
      handleSessionExpiration();
    }
    return error;
  }
};

const handleSessionExpiration = (): void => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "/auth/login"; // Redirect to login page
};

// ==================================== Global Service ==================

// User Login
export const userLogin = async (
  payload: LoginPayload
): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/login", payload);
};

// User SSO Login
export const userSSOLogin = async (
  payload: LoginPayload
): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/login/google", payload);
};

// User Logout
export const userLogout = async (): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/logout", {});
};

// User Registration
export const registerNewUser = async (
  payload: RegistrationPayload
): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/signup", payload);
};

// Forgot Password
export const forgotPassword = async (payload: {
  email: string;
}): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/forgot-password", payload);
};

// Send OTP
export const recordotp = async (
  payload: any,
  query: string
): Promise<ApiResponse> => {
  return apiRequest("post", `/uam/reset-password/${query}`, payload);
};

// Resend OTP
export const resendOtp = async (payload: any): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/resend-otp", payload);
};

// Change Password
export const changeUserPassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResponse> => {
  return apiRequest("post", "/uam/change-password", payload);
};

// Verify user OTP
export const verifyUser = async (
  payload: any,
  query: string
): Promise<ApiResponse> => {
  return apiRequest("post", `/uam/validate-identity/${query}`, payload);
};

// ==================================== Platform URL ==================

// Get Home Lists
export const getHomeLists = async (
  payload: any,
  query: string
): Promise<ApiResponse> => {
  return apiRequest("post", `${platform_url}/market-report/${query}`, payload);
};

// Dropdown Filters List
export const dropdownFiltersList = async (): Promise<ApiResponse> => {
  return apiRequest("get", `${platform_url}/market-report/filter-list`);
};

// Get Summary Lists
export const getSummaryLists = async (
  payload: any
): Promise<ApiResponse<MarketReportResponse>> => {
  return apiRequest("post", `${platform_url}/market-report/summary`, payload);
};
