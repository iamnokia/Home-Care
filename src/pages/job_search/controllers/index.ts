import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleNaVigate = (path: string) => {
    navigate(path);
  };
  const handleGetAllData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_employees", {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, []);
  return {
    loading,
    data,
    handleNaVigate,
    navigate,
  };
};
export default useMainController;