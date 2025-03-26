import { Box } from "@mui/material";
import Services from "./components/services";


const JobSearchPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Services/>
      </Box>
      <Box sx={{ maxWidth: 1300, width: "100%" }}></Box>
    </Box>
  );
};


export default JobSearchPage;
