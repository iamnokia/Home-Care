import { useNavigate } from "react-router-dom";

const useMainController = () => {
  const navigate = useNavigate();
  const handleNaVigate = (path: string) => {
    navigate(path);
  };
  return {
    handleNaVigate,
    navigate,
  };
};
export default useMainController;
