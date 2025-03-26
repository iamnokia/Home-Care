
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleNaVigate = (path: string) => {
    navigate(path);
  };

  const handleGetDataById = async (): Promise<void> => {
    try {
      setLoading(true);
      // Using the id parameter in the URL
      const res = await axios.get(`https://homecare-pro.onrender.com/employees/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData(Array.isArray(res.data) ? res.data : [res.data]); // Handle both array and single object responses
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    if (id) {
      handleGetDataById();
    }
  }, [id]); // Add id to the dependency array so it refetches when id changes

  return {
    loading,
    data,
    handleNaVigate,
    navigate,
    id // Return the id so it can be used in the component
  };
};

export default useMainController;