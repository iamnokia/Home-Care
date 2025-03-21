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
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LOCATION_PATH } from "../../../routes/path";

// Font size constants with responsive adjustments
const getFontSize = (isSmallScreen) => ({
  title: isSmallScreen ? "1.4rem" : "1.7rem",
  subtitle: isSmallScreen ? "1rem" : "1.2rem",
  text: isSmallScreen ? "0.9rem" : "1rem",
  button: isSmallScreen ? "0.95rem" : "1.05rem",
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
      { id: 1, rating: 5, comment: "ດີຫຼາຍ", user: "ນາງ ກອນນະລີ", date: "15 ມີນາ 2025" },
      { id: 2, rating: 4, comment: "ດີຫຼາຍ", user: "ທ້າວ ສົມສະໄໝ", date: "10 ມີນາ 2025" },
      { id: 3, rating: 4, comment: "ດີຫຼາຍ", user: "ນາງ ວັນນິດາ", date: "28 ກຸມພາ 2025" },
    ],
  });

  // Calculate container width based on screen size
  const getContainerWidth = () => {
    if (isLargeScreen) return "lg";
    if (isMediumScreen) return "md";
    return "sm";
  };

  // Get consistent max width for content
  const getContentMaxWidth = () => {
    return isLargeScreen ? "850px" : "100%";
  };

  return (
    <Container
      maxWidth={getContainerWidth()}
      sx={{
        p: 0,
        mb: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
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
        {/* Header section with gradient background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #7d1f82 0%, #4a0d4c 100%)",
            color: "white",
            borderRadius: { xs: "0 0 30px 30px", md: "0 0 40px 40px" },
            p: { xs: 3, sm: 4 },
            pb: { xs: 4, sm: 5 },
            mb: 3,
            position: "relative",
            width: "100%",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton
              onClick={() => navigate("/Service")}
              sx={{ 
                color: "white", 
                mr: 1,
                "&:hover": { 
                  backgroundColor: "rgba(255,255,255,0.1)" 
                }
              }}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography 
              variant="h5" 
              sx={{ 
                fontSize: fontSize.title, 
                fontWeight: "bold",
                letterSpacing: "0.5px"
              }}
            >
              ລາຍລະອຽດການບໍລິການ
            </Typography>
          </Box>

          {/* Profile info with improved styling */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "flex-start", 
            mb: 3, 
            background: "rgba(255,255,255,0.1)",
            borderRadius: 3,
            p: 2
          }}>
            <Avatar
              src={serviceData.image}
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                mr: 2.5,
                border: "3px solid white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ 
                fontSize: fontSize.subtitle, 
                fontWeight: "bold",
                mb: 0.5,
                letterSpacing: "0.5px"
              }}>
                {serviceData.firstName} {serviceData.surname}
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarTodayIcon sx={{ fontSize: "1rem", mr: 0.5, opacity: 0.8 }} />
                  <Typography sx={{ fontSize: fontSize.text }}>
                    {serviceData.age} ປີ
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ fontSize: "1rem", mr: 0.5, opacity: 0.8 }} />
                  <Typography sx={{ fontSize: fontSize.text }}>
                    {serviceData.gender}
                  </Typography>
                </Box>
              </Stack>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOnIcon sx={{ fontSize: "1.1rem", mr: 0.7, opacity: 0.8 }} />
                <Typography sx={{ fontSize: fontSize.text }}>
                  {serviceData.village}, {serviceData.city}
                </Typography>
              </Box>
              
              {/* Rating display */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  value={serviceData.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                  sx={{
                    mr: 1,
                    "& .MuiRating-iconFilled": {
                      color: "#FFD700",
                    },
                  }}
                />
                <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium" }}>
                  {serviceData.rating}
                </Typography>
              </Box>
              
              {/* Category in stylish chip */}
              <Chip
                icon={<CategoryIcon style={{ color: "#611463" }} />}
                label={serviceData.category}
                sx={{
                  borderRadius: "16px",
                  backgroundColor: "white",
                  color: "#611463",
                  fontWeight: "bold",
                  fontSize: fontSize.text,
                  "& .MuiChip-icon": {
                    color: "#611463",
                  },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          </Box>

          {/* Price in glass-morphism box */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            p: 2,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}>
            <MonetizationOnIcon sx={{ mr: 1.5, fontSize: "1.5rem" }} />
            <Box>
              <Typography sx={{ fontSize: fontSize.text, opacity: 0.8 }}>
                ລາຄາຄ່າບໍລິການ
              </Typography>
              <Typography sx={{
                fontSize: { xs: "1.5rem", sm: "1.8rem" },
                fontWeight: "bold",
                color: "white"
              }}>
                {serviceData.priceFormatted}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Service details section */}
        <Box sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}>
          {/* Skills section with improved card design */}
          <Typography sx={{ 
            fontSize: fontSize.subtitle, 
            fontWeight: "600", 
            mb: 2,
            ml: 1,
            display: "flex",
            alignItems: "center",
          }}>
            <WorkIcon sx={{ mr: 1.5, color: "#611463" }} />
            ການບໍລິການ ແລະ ທັກສະ
          </Typography>

          <Card
            elevation={2}
            sx={{
              p: { xs: 0, sm: 0 },
              borderRadius: 4,
              mb: 4,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Typography sx={{ 
                fontSize: fontSize.text, 
                lineHeight: 1.8,
                color: "#424242"
              }}>
                {serviceData.skills}
              </Typography>
            </CardContent>
          </Card>

          {/* Reviews section with enhanced cards */}
          <Typography sx={{ 
            fontSize: fontSize.subtitle, 
            fontWeight: "600", 
            mb: 2,
            ml: 1,
            display: "flex",
            alignItems: "center",
          }}>
            <StarIcon sx={{ mr: 1.5, color: "#611463" }} />
            ລີວິວຈາກລູກຄ້າ
          </Typography>

          <Stack spacing={2} sx={{ mb: 4 }}>
            {serviceData.reviews.map((review) => (
              <Card
                key={review.id}
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Avatar
                      sx={{ 
                        width: 45, 
                        height: 45, 
                        mr: 2,
                        bgcolor: "#611463"
                      }}
                    >
                      {review.user.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.7
                      }}>
                        <Typography sx={{ 
                          fontSize: fontSize.text, 
                          fontWeight: "600" 
                        }}>
                          {review.user}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: "0.75rem", 
                          color: "text.secondary" 
                        }}>
                          {review.date}
                        </Typography>
                      </Box>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{
                          mb: 1,
                          "& .MuiRating-iconFilled": {
                            color: "#FFD700",
                          },
                        }}
                      />
                      <Typography sx={{ 
                        fontSize: fontSize.text,
                        color: "#424242",
                        fontStyle: "italic"
                      }}>
                        "{review.comment}"
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Button container with floating effect */}
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              p: { xs: 2.5, sm: 3 },
              backgroundColor: "white",
              borderRadius: 4,
              position: "sticky",
              bottom: 16,
              zIndex: 10,
              boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
              mb: 3
            }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: "48%",
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": { 
                  borderWidth: 2,
                  backgroundColor: "rgba(211, 47, 47, 0.04)"
                },
              }}
              onClick={() => navigate("/Service")}
            >
              ຍົກເລີກ
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: "48%",
                borderRadius: 2,
                background: "linear-gradient(45deg, #611463 30%, #8a1b92 90%)",
                boxShadow: "0 4px 15px rgba(97, 20, 99, 0.4)",
                "&:hover": { 
                  background: "linear-gradient(45deg, #4a0d4c 30%, #7d1f82 90%)",
                  boxShadow: "0 6px 20px rgba(97, 20, 99, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate(LOCATION_PATH)}
            >
              ເລືອກບໍລິການ
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceDetailsPage;