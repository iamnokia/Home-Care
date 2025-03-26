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

const TakeMore = () => {
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
    { icon: <VerifiedIcon fontSize="small" sx={{ color: "#611463" }} />, text: "ປອດໄພ" },
    { icon: <HandymanIcon fontSize="small" sx={{ color: "#611463" }} />, text: "ຄົບທຸກບໍລິການ" },
    { icon: <CleaningServicesIcon fontSize="small" sx={{ color: "#611463" }} />, text: "ສະດວກສະບາຍ" }
  ];

  return (
    <Box sx={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #f9f1fc 0%, #ffffff 100%)", py: { xs: 4, md: 5 } }}>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, order: { xs: 2, md: 1 } }}>
            <Box sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}>
              <Fade in={animateTitle} timeout={800}>
                <Typography variant={isMobile ? "h4" : "h3"} component="h1" sx={{ fontWeight: 800, color: "#611463", mb: 1, fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" }, lineHeight: 1.1 }}>Home <span style={{ color: "#f7931e" }}>Care</span></Typography>
              </Fade>
              <Fade in={animateContent} timeout={800}>
                <Typography variant={isMobile ? "h6" : "h5"} component="h2" sx={{ color: "#611463", mb: 2, fontWeight: 600, lineHeight: 1.4, fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.4rem" } }}>
                  <span style={{ color: "#611463" }}>ຄົບທຸກບໍລິການ </span>
                  <span style={{ color: "#f7931e" }}>ດູແລບ້ານທ່ານເຖິງທີ່</span>
                </Typography>
              </Fade>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
                <Button href={SERVICE_PATH} variant="contained" startIcon={<ExploreIcon />} sx={{ textTransform: "none", px: 3, py: 1.2, borderRadius: "40px", fontSize: "0.95rem", fontWeight: 600, background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)", boxShadow: "0 4px 12px rgba(97, 20, 99, 0.3)" }}>
                  ເບິ່ງການບໍລິການ
                </Button>
                <Button variant="outlined" href={CONTACT_US_PATH} startIcon={<CallIcon />} sx={{ textTransform: "none", px: 3, py: 1.2, borderRadius: "40px", fontSize: "0.95rem", fontWeight: 600, borderColor: "#611463" }}>
                  ຕິດຕໍ່ພວກເຮົາ
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TakeMore;
