"use client";
import { useState } from "react";

const useApi = (apiUrl, { headers = {}, ...options } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const defaultApiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";

  const apiEndpoint = apiUrl || defaultApiUrl;

  const fetchData = async (url, options = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      setData(responseData);
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const makeRequest = async (endpoint, requestOptions = {}) => {
    try {
      const requestData = await fetchData(apiEndpoint + endpoint, {
        headers,
        ...options,
        ...requestOptions,
      });
      return requestData;
    } catch (error) {
      throw error;
    }
  };

  return { isLoading, error, data, makeRequest };
};

export default useApi;
