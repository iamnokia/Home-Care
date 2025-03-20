import { Box } from "@mui/material";
import RecommendJob from "./components/TakeMore";
import HeaderPage from "./components/header";

const HomePage = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ maxWidth: 1300, width: "100%" }}>
        <Box sx={{ width: "100%", mb: 2, overflow: "hidden" }}></Box>

        <HeaderPage />

        <RecommendJob />
      </Box>

      <Box sx={{ width: "100%" }}>
      </Box>

    </Box>
  );
};

export default HomePage;
