import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Container, useTheme, useMediaQuery, Paper, Stack, Fade, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import ExploreIcon from '@mui/icons-material/Explore';
import CallIcon from '@mui/icons-material/Call';
import VerifiedIcon from '@mui/icons-material/Verified';
import HandymanIcon from '@mui/icons-material/Handyman';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

// Import images
import ads from "../../../assets/icons/HomeCareAds.png";
import ads2 from "../../../assets/icons/ads2.png";
import ads3 from "../../../assets/icons/ads3.jpg";
import ads4 from "../../../assets/icons/ads4.jpg";
import ads5 from "../../../assets/icons/ads5.jpg";

// Import required Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { CONTACT_US_PATH, SERVICE_PATH } from "../../../routes/path";

const HeaderPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  
  // Sample images array
  const images = [ads, ads2, ads3, ads4, ads5];
  
  // Animation effect on component mount
  useEffect(() => {
    const titleTimer = setTimeout(() => setAnimateTitle(true), 100);
    const contentTimer = setTimeout(() => setAnimateContent(true), 400);
    const imageTimer = setTimeout(() => setAnimateImage(true), 300);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(contentTimer);
      clearTimeout(imageTimer);
    };
  }, []);

  // Feature items
  const features = [
    { icon: <VerifiedIcon fontSize="small" sx={{ color: "#611463" }} />, text: "Professional" },
    { icon: <HandymanIcon fontSize="small" sx={{ color: "#611463" }} />, text: "Quality" },
    { icon: <CleaningServicesIcon fontSize="small" sx={{ color: "#611463" }} />, text: "Affordable" }
  ];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f9f1fc 0%, #ffffff 100%)",
        py: { xs: 4, md: 5 }
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247, 147, 30, 0.08) 0%, rgba(247, 147, 30, 0) 70%)",
          top: "-150px",
          left: "-150px",
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(97, 20, 99, 0.05) 0%, rgba(97, 20, 99, 0) 70%)",
          bottom: "-200px",
          right: "-200px",
          
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          alignItems="center"
          justifyContent="center"
        >
          {/* Text Column */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              order: { xs: 2, md: 1 }
            }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: { xs: "center", md: "left" }
              }}
            >
              <Fade in={animateTitle} timeout={800}>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    color: "#611463",
                    mb: 1,
                    fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" },
                    lineHeight: 1.1,
                    position: "relative",
                    display: "inline-block"
                  }}
                >
                  Home
                  <span style={{ 
                    color: "#f7931e",
                    position: "relative",
                    display: "inline-block"
                  }}>
                    Care
                    <Box component="span" sx={{
                      position: "absolute",
                      height: "8px",
                      width: "100%",
                      background: "rgba(247, 147, 30, 0.2)",
                      bottom: "10px",
                      left: 0,
                      zIndex: -1,
                      borderRadius: "4px"
                    }}></Box>
                  </span>
                </Typography>
              </Fade>
              
              <Fade in={animateContent} timeout={800}>
                <Box>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    component="h2"
                    sx={{
                      color: "#611463",
                      mb: 2,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.4rem" }
                    }}
                  >
                    <span style={{ color: "#611463" }}>ຄົບທຸກບໍລິການ </span>
                    <span style={{ color: "#f7931e" }}>ດູແລບ້ານທ່ານເຖິງທີ່</span>
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 3,
                      maxWidth: { xs: "100%", md: "90%" },
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      lineHeight: 1.6
                    }}
                  >
                    ບໍລິການທຳຄວາມສະອາດ, ສ້ອມແປງແອ, ສ້ອມແປງໄຟຟ້າ, ສ້ອມແປງນ້ຳປະປາ, ແກ່ເຄື່ອງ, ດູດສ້ວມ, ກຳຈັດປວກ  ແລະ ບຳລຸງຮັກສາເຮືອນຂອງທ່ານໂດຍຊ່ຽວຊານທີ່ພວກເຮົາຮັບປະກັນໄດ້.
                  </Typography>
                  
                  {/* Feature Chips */}
                  <Box sx={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: 1.5, 
                    mb: 3,
                    justifyContent: { xs: "center", md: "flex-start" }
                  }}>
                    {features.map((feature, index) => (
                      <Chip
                        key={index}
                        icon={feature.icon}
                        label={feature.text}
                        sx={{
                          backgroundColor: "rgba(97, 20, 99, 0.06)",
                          color: "#611463",
                          fontWeight: 500,
                          border: "1px solid rgba(97, 20, 99, 0.1)",
                          borderRadius: "20px",
                          py: 0.5,
                          "& .MuiChip-label": {
                            px: 1
                          }
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1.5, sm: 2 }}
                  >
                    <Button
                      href={SERVICE_PATH}
                      variant="contained"
                      startIcon={<ExploreIcon />}
                      sx={{
                        textTransform: "none",
                        px: 3,
                        py: 1.2,
                        borderRadius: "40px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                        boxShadow: "0 4px 12px rgba(97, 20, 99, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 15px rgba(97, 20, 99, 0.4)",
                          transition: "all 0.3s ease"
                        }
                      }}
                    >
                      Explore Services
                    </Button>
                    
                    <Button
                      variant="outlined"
                      href={CONTACT_US_PATH}
                      startIcon={<CallIcon />}
                      sx={{
                        textTransform: "none",
                        px: 3,
                        py: 1.2,
                        borderRadius: "40px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        borderColor: "#611463",
                        borderWidth: "1.5px",
                        color: "#611463",
                        "&:hover": {
                          borderColor: "#611463",
                          backgroundColor: "rgba(97, 20, 99, 0.05)",
                          transform: "translateY(-2px)",
                          transition: "all 0.3s ease"
                        }
                      }}
                    >
                      Contact Us
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* Image Column with Swiper */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, md: 2 }
            }}
          >
            <Fade in={animateImage} timeout={800}>
              <Paper
                elevation={5}
                sx={{
                  width: "100%",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                  maxWidth: { xs: "100%", md: "520px" },
                  mx: "auto",
                  transition: "transform 0.4s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                  }
                }}
              >
                <Swiper
                  modules={[Autoplay, Pagination, Navigation, EffectFade]}
                  spaceBetween={0}
                  slidesPerView={1}
                  effect="fade"
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                  }}
                  navigation={true}
                  loop={true}
                  style={{ 
                    height: isMobile ? "250px" : isTablet ? "300px" : "340px" 
                  }}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "25%",
                            background: "linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0))",
                            zIndex: 1
                          }
                        }}
                      >
                        <img
                          src={image}
                          alt={`HomeCare Service ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeaderPage;