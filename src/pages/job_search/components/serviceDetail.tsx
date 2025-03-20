import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  Stack,
  Rating,
  Divider,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { LOCATION_PATH } from "../../../routes/path";

// Font size constants with responsive adjustments
const getFontSize = (isSmallScreen) => ({
  title: isSmallScreen ? "1.3rem" : "1.5rem",
  subtitle: isSmallScreen ? "0.9rem" : "1rem",
  text: isSmallScreen ? "0.85rem" : "0.9rem",
  button: isSmallScreen ? "0.9rem" : "1rem",
});

const ServiceDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  
  // Apply font sizes based on screen size
  const fontSize = getFontSize(isSmallScreen);
  
  const [serviceData, setServiceData] = useState({
    id: 1,
    name: "ດູດຝຸ່ນ, ທຳຄວາມສະອາດ",
    firstName: "ອຳມະລິນ",
    surname: "ອຸນາລົມ",
    price: 250000,
    priceFormatted: "250,000 KIP",
    image: "/api/placeholder/40/40",
    category: "ທຳຄວາມສະອາດ",
    gender: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "ວຽງຈັນ",
    skills: "ຂ້ອຍມີປະສົບການ 3 ປີໃນການເປັນແມ່ບ້ານ. ຂ້ອຍສາມາດດູດຝຸ່ນ, ອະນາໄມເຮືອນ, ຊັກເຄື່ອງ, ແລະ ປຸງແຕ່ງອາຫານໄດ້. ຂ້ອຍເຮັດວຽກຢ່າງຂະຫຍັນຂັນແຂ່ງ ແລະ ຮັບຜິດຊອບສູງ.",
    rating: 4.5,
    reviews: [
      { id: 1, rating: 5, comment: "ດີຫຼາຍ" },
      { id: 2, rating: 4, comment: "ດີຫຼາຍ" },
      { id: 3, rating: 4, comment: "ດີຫຼາຍ" },
    ],
  });

  // Format currency
  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
  };

  const handleBookService = () => {
    navigate(`/order-confirmation/${id}`);
  };

  // Calculate container width based on screen size
  const getContainerWidth = () => {
    if (isLargeScreen) return "lg";
    if (isMediumScreen) return "md";
    return "sm";
  };

  // Get consistent max width for content
  const getContentMaxWidth = () => {
    return isLargeScreen ? "800px" : "100%";
  };

  return (
    <Container 
      maxWidth={getContainerWidth()} 
      sx={{ 
        p: 0, 
        mb: 4,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {/* Content wrapper with max width for large screens */}
      <Box 
        sx={{ 
          width: "100%", 
          maxWidth: getContentMaxWidth(),
          mx: "auto"
        }}
      >
        {/* Header section with purple background */}
        <Box
          sx={{
            backgroundColor: "#611463",
            color: "white",
            borderRadius: { xs: "0 0 20px 20px", md: "0 0 30px 30px" },
            p: { xs: 2, sm: 3 },
            pb: { xs: 3, sm: 4 },
            mb: 2,
            position: "relative",
            width: "100%"
          }}
        >
          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton
              onClick={() => navigate("/Service")}
              sx={{ color: "white", mr: 1 }}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: fontSize.title, fontWeight: "bold" }}>
              ລາຍລະອຽດ
            </Typography>
          </Box>

          {/* Profile info */}
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
            <Avatar
              src={serviceData.image}
              sx={{ 
                width: { xs: 60, sm: 70 }, 
                height: { xs: 60, sm: 70 }, 
                mr: 2 
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold" }}>
                {serviceData.firstName} {serviceData.surname}
              </Typography>
              <Typography sx={{ fontSize: fontSize.text, mt: 0.5 }}>
                {serviceData.age} ປີ | {serviceData.gender}
              </Typography>
              <Typography sx={{ fontSize: fontSize.text }}>
                {serviceData.village}, {serviceData.city}
              </Typography>
              {/* Category in white box */}
              <Paper
                elevation={2}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  maxWidth: "fit-content" 
                }}
              >
                <CategoryIcon sx={{ color: "#611463", mr: 1.5, fontSize: isSmallScreen ? "1rem" : "1.2rem" }} />
                <Typography sx={{ fontSize: fontSize.text, color: "#611463", fontWeight: "bold" }}>
                  {serviceData.category}
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* Price in purple box - Aligned to the right */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Right-align the entire price section
            mt: 2
          }}>
            <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium", mr: 1 }}>
              ລາຄາ:
            </Typography>
            <Typography sx={{
              fontSize: fontSize.subtitle,
              fontWeight: "bold",
              color: "white"
            }}>
              {serviceData.priceFormatted}
            </Typography>
          </Box>
        </Box>

        {/* Service details section */}
        <Box sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
          <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", mb: 2 }}>
            ການບໍລິການ ແລະ ທັກສະ
          </Typography>

          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: 2,
              mb: 3,
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography sx={{ fontSize: fontSize.text, lineHeight: 1.6 }}>
              {serviceData.skills}
            </Typography>
          </Paper>

         

          {/* Reviews section */}
          <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", mb: 2 }}>
            ລີວິວ
          </Typography>

          <Paper
            elevation={2}
            sx={{
              borderRadius: 2,
              p: 0,
              mb: 3,
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              overflow: "hidden"
            }}
          >
            {serviceData.reviews.map((review, index) => (
              <React.Fragment key={review.id}>
                <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      src={serviceData.image}
                      sx={{ width: { xs: 35, sm: 40 }, height: { xs: 35, sm: 40 }, mr: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontSize: fontSize.text, fontWeight: "bold" }}>
                        {serviceData.firstName} {serviceData.surname}
                      </Typography>
                      <Typography sx={{ fontSize: isSmallScreen ? "0.75rem" : "0.8rem" }}>
                        {review.comment}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#FFD700",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                {index < serviceData.reviews.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Paper>
          
          {/* Button container placed below reviews */}
          <Box sx={{ 
            width: "100%", 
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 2,
            p: { xs: 1, sm: 2 },
            backgroundColor: "white",
            borderRadius: 2,
          }}>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: "45%",
                mx: 1,
                fontSize: fontSize.button,
                borderRadius: 5,
                py: { xs: 0.8, sm: 1 },
              }}
              onClick={() => navigate("/Service")}            >
              ຍົກເລີກ
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "45%",
                mx: 1,
                fontSize: fontSize.button,
                borderRadius: 5,
                py: { xs: 0.8, sm: 1 },
                backgroundColor: "#39b54a",
                "&:hover": { backgroundColor: "#2e9a3e" },
              }}
              onClick={() => navigate(LOCATION_PATH)}            
            >
              ເລືອກ
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceDetailsPage;