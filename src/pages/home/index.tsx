import { Box } from "@mui/material";
import HeaderPage from "./components/header";
import JobSearchPage from "../job_search";

const HomePage = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ maxWidth: 1300, width: "100%" }}>
        <Box sx={{ width: "100%", mb: 2, overflow: "hidden" }}></Box>

        <HeaderPage />

        <JobSearchPage />
      </Box>

      <Box sx={{ width: "100%" }}>
      </Box>

    </Box>
  );
};

export default HomePage;
