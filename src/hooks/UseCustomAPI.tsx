import { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null); // Explicitly specify the type

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (error: any) {
      // Catch all errors as 'any' to avoid type issues
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // You can add more functions for other HTTP methods like POST, PUT, DELETE if needed

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}
