import Cookies from "js-cookie";
import { BASE_URL } from "../constants/constants";

/**
 * Centralized HTTP Request Handler
 * Standardizes headers, authentication token handling, JSON parsing, and error normalization.
 */
export const request = async (endpoint, options = {}) => {
  const token = Cookies.get("jwt_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Clear expired token on unauthorized response
        Cookies.remove("jwt_token");
      }
      const errorMessage = data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
