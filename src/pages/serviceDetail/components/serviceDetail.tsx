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
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BadgeIcon from "@mui/icons-material/Badge";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import useMainController from "../controllers/index";
import { Gender } from "../../../enums/gender";

// Font size constants with responsive adjustments
const getFontSize = (isSmallScreen) => ({
  title: isSmallScreen ? "1.4rem" : "1.7rem",
  subtitle: isSmallScreen ? "1rem" : "1.2rem",
  text: isSmallScreen ? "0.9rem" : "1rem",
  button: isSmallScreen ? "0.95rem" : "1.05rem",
});

// Mock reviews data (this would ideally come from the API)
const mockReviews = [
  { id: 1, rating: 5, comment: "ດີຫຼາຍ", user: "ນາງ ກອນນະລີ", date: "15 ມີນາ 2025" },
  { id: 2, rating: 4, comment: "ດີຫຼາຍ", user: "ທ້າວ ສົມສະໄໝ", date: "10 ມີນາ 2025" },
  { id: 3, rating: 4, comment: "ດີຫຼາຍ", user: "ນາງ ວັນນິດາ", date: "28 ກຸມພາ 2025" },
];

const ServiceDetailsPage = () => {
  const { data, car, loading, handleNaVigate } = useMainController();
  const employee = data[0]; // Get the first employee from the data array
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { id } = useParams();

  // Apply font sizes based on screen size
  const fontSize = getFontSize(isSmallScreen);

  // Determine the service type based on category name
  const getCategoryType = (categoryName) => {
    const lowerCaseCategory = categoryName?.toLowerCase() || "";
    if (lowerCaseCategory.includes("ຂົນສົ່ງ") || lowerCaseCategory.includes("moving")) {
      return "moving";
    } else if (lowerCaseCategory.includes("ຫ້ອງນ້ຳ") || lowerCaseCategory.includes("bathroom")) {
      return "bathroom";
    }
    return "cleaning"; // Default to cleaning
  };

  // Check if category ID is 5 to show car details
  const showCarDetails = employee?.cat_id === 5;

  // Service data from API
  const [serviceData, setServiceData] = useState({
    id: "",
    name: "",
    firstName: "",
    surname: "",
    price: 0,
    priceFormatted: "",
    image: "",
    category: "",
    categoryType: "cleaning",
    gender: "",
    village: "",
    city: "",
    skills: "",
    rating: 4.5,
    reviews: mockReviews,
    // Car-related fields will be added conditionally
  });

  // Update service data when employee data is loaded
  useEffect(() => {
    if (employee) {
      const categoryType = getCategoryType(employee.cat_name);

      // Format the price with commas
      const formatPrice = (price) => {
        const numPrice = parseFloat(price);
        return numPrice.toLocaleString() + " KIP";
      };

      const genderText = employee.gender === Gender.MALE ? "ຊາຍ" : "ຍິງ";

      // Extract address components (this is a placeholder - adjust according to your data structure)
      const addressParts = employee.address ? employee.address.split(',') : [];
      const village = addressParts[0] || "ບ້ານ ໂນນສະຫວ່າງ"; // Default if not available

      // Create the service data object
      const newServiceData = {
        id: employee.id,
        name: employee.cat_name,
        firstName: employee.first_name,
        surname: employee.last_name,
        price: parseFloat(employee.price),
        priceFormatted: formatPrice(employee.price),
        image: employee.avatar || "/api/placeholder/400/300",
        category: employee.cat_name,
        categoryType: categoryType,
        gender: genderText,
        cat_id: employee.cat_id, // Add category ID
        village: village,
        city: employee.city || "ວຽງຈັນ",
        skills: employee.cv || "ຂ້ອຍມີປະສົບການ 3 ປີໃນການເປັນແມ່ບ້ານ. ຂ້ອຍສາມາດດູດຝຸ່ນ, ອະນາໄມເຮືອນ, ຊັກເຄື່ອງ, ແລະ ປຸງແຕ່ງອາຫານໄດ້. ຂ້ອຍເຮັດວຽກຢ່າງຂະຫຍັນຂັນແຂ່ງ ແລະ ຮັບຜິດຊອບສູງ.",
        rating: 4.5,
        reviews: mockReviews,
      };

      // Add car-related properties if the category ID is 5 and we have car data
      if (showCarDetails && car && car.length > 0) {
        // Filter car data to find the matching car for this employee
        const employeeCar = car.find(c => c.emp_id === employee.id);

        if (employeeCar) {
          // Use the employee's specific car
          Object.assign(newServiceData, {
            carId: employeeCar.id || "N/A",
            carBrand: employeeCar.car_brand || "N/A",
            carModel: employeeCar.model || "N/A",
            licensePlate: employeeCar.license_plate || "N/A",
            carYear: employeeCar.created_at ? new Date(employeeCar.created_at).getFullYear().toString() : "N/A",
            carImage: employeeCar.car_image,
          });
        } else {
          // No matching car found for this employee
          console.log("No car found for employee ID:", employee.id);
        }
      }

      setServiceData(newServiceData);
    }
  }, [employee, car, showCarDetails]);

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

  // Loading component with white background, #611463 and #f7931e accents

  // Show enhanced loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "white",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(97,20,99,0.05) 0%, rgba(97,20,99,0) 70%)",
            animation: "pulse 3s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.3 },
              "50%": { transform: "scale(1.1)", opacity: 0.1 },
              "100%": { transform: "scale(1)", opacity: 0.3 }
            }
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,147,30,0.05) 0%, rgba(247,147,30,0) 70%)",
            animation: "pulse 3s infinite ease-in-out 1s",
          }}
        />

        {/* Main loading spinner with custom animation */}
        <Box
          sx={{
            position: "relative",
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2
          }}
        >
          {/* Outer spinning circle - purple */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "4px solid rgba(97,20,99,0.1)",
              borderTop: "4px solid #611463",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" }
              }
            }}
          />

          {/* Inner spinning circle - orange */}
          <Box
            sx={{
              position: "absolute",
              width: "70%",
              height: "70%",
              border: "4px solid rgba(247,147,30,0.1)",
              borderBottom: "4px solid #f7931e",
              borderRadius: "50%",
              animation: "spinReverse 1.2s linear infinite",
              "@keyframes spinReverse": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(-360deg)" }
              }
            }}
          />

          {/* Center pulsing dot - mix */}
          <Box
            sx={{
              width: "20px",
              height: "20px",
              background: "linear-gradient(135deg, #611463, #f7931e)",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
        </Box>

        {/* Loading text with animation */}
        <Typography
          variant="h6"
          sx={{
            color: "#611463",
            mt: 2,
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: "1px",
            animation: "fadeInOut 1.5s infinite ease-in-out",
            "@keyframes fadeInOut": {
              "0%": { opacity: 0.5 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.5 }
            }
          }}
        >
          ກຳລັງໂຫຼດ...
        </Typography>

        {/* Animated progress dots - alternating colors */}
        <Box
          sx={{
            display: "flex",
            mt: 1,
            gap: "8px",
            alignItems: "center"
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: "8px",
                height: "8px",
                backgroundColor: i === 1 ? "#f7931e" : "#611463",
                borderRadius: "50%",
                opacity: 0.7,
                animation: "bounce 1.4s infinite ease-in-out",
                animationDelay: `${i * 0.2}s`,
                "@keyframes bounce": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.5)" }
                }
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

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
              onClick={() => handleNaVigate("/Service")}
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
              {showCarDetails ? 'ລາຍລະອຽດການບໍລິການ ແລະ ລົດ' : 'ລາຍລະອຽດການບໍລິການ'}
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

        <Box sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}>
          {/* Car details section - Only shown for category ID 5 */}
          {showCarDetails && (
            <>
              <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "flex-start" },
                gap: 3,
                mb: 4
              }}>
                {/* Left side: Car image with gradient overlay */}
                <Box sx={{
                  width: { xs: "100%", md: "40%" },
                  height: { xs: 200, md: 250 },
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  border: "3px solid rgba(255,255,255,0.2)",
                  flexShrink: 0,
                }}>
                  <img
                    src={serviceData.carImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Overlay gradient for better text visibility */}
                </Box>

                {/* Right side: Vehicle information */}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{
                    fontSize: fontSize.subtitle,
                    fontWeight: "600",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <DirectionsCarIcon sx={{ mr: 1.5, color: "#611463" }} />
                    ຂໍ້ມູນພາຫະນະ
                  </Typography>

                  <Card
                    elevation={2}
                    sx={{
                      p: { xs: 0, sm: 0 },
                      borderRadius: 4,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                      overflow: "hidden",
                      border: "1px solid rgba(0,0,0,0.05)",
                      position: "relative",
                      height: { md: "calc(100% - 42px)" },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                      {/* Car details grid */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <TimeToLeaveIcon sx={{ fontSize: "1.1rem", mr: 1, color: "#611463" }} />
                            <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium", color: "#611463" }}>
                              ຍີ່ຫໍ້ & ລຸ້ນ
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: fontSize.text, ml: 4, color: "#424242" }}>
                            {serviceData.carBrand} {serviceData.carModel}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <BadgeIcon sx={{ fontSize: "1.1rem", mr: 1, color: "#611463" }} />
                            <Typography sx={{ fontSize: fontSize.text, fontWeight: "medium", color: "#611463" }}>
                              ປ້າຍທະບຽນ
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: fontSize.text, ml: 4, color: "#424242" }}>
                            {serviceData.licensePlate}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </>
          )}

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
              onClick={() => navigate(`/Location/${id}`)}
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