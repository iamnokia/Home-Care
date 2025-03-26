import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";
import { CarModel } from "../../../models/car";

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [carData, setCarData] = useState<CarModel[]>([]);
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

  const handleGetCarData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get("https://homecare-pro.onrender.com/emp_car/read_emp_car", {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      setCarData(res.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllData();
    handleGetCarData();
  }, []);
  return {
    carData,
    loading,
    data,
    handleNaVigate,
    navigate,
  };
};
export default useMainController;