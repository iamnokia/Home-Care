import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axiosInstance from "../../../configs/axios";

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
       const res = await axiosInstance.get("/employees/all");
       setData(res.data?.data);
     } catch (error) {
       console.error("Error fetching pet data:", error);
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