import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ads from "../../../assets/icons/HomeCareAds.png";
import ads2 from "../../../assets/icons/ads2.png";
import ads3 from "../../../assets/icons/ads3.jpg";
import ads4 from "../../../assets/icons/ads4.jpg";
import ads5 from "../../../assets/icons/ads5.jpg";


// Import required Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SERVICE_PATH } from "../../../routes/path";

const HeaderPage = () => {
  // Sample images array - replace these with your actual image imports
  const images = [
    ads, 
    ads2,
    ads3,
    ads4,
    ads5,

  ];

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          py: 4,
          mt: -20,
          mb: -20, // Add vertical padding
          minHeight: "70vh",
        }}
      >
        {/* Text Column */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              textAlign={"center"}
              sx={{
                fontWeight: "bold",
                color: "#611463",
                mb: 2,
              }}
            >
              Home
            <span style={{ color: "#f7931e" }}>Care</span>

            </Typography>
            
            <Typography
              variant="h4"
              component="h2"
              textAlign={"center"}
              sx={{
                color: "#f7931e",
                mb: 2,
              }}
            >
              <span style={{ color: "#611463" }}>ຄົບທຸກບໍລິການ </span>ດູແລບ້ານທ່ານເຖິງທີ່
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 2,
              width: "65%",
              justifyContent: "center",
            }}
          >
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "Space-between",
              gap: 8,
              mt: 2,
            }}
          >
            <Button
              href={SERVICE_PATH}
              variant="contained"
              sx={{ textTransform: "none", px: 5, height: 48 ,bgcolor:"#611463",
                "&:hover": {
                  bgcolor: "#f7931e",
                  borderColor: "purple",
                  color: "purple",
                  transition: "all 0.3s ease"}}}
              color="primary"
              size="large"
            >
              Explore Service
            </Button>
            <Button
        
              variant="outlined"
              sx={{ textTransform: "none", px: 5, height: 48 , 
                "&:hover": {
                  bgcolor: "#611463",
                  borderColor: "purple",
                  color: "white",
                  transition: "all 0.3s ease"}}}
              color="primary"
              size="large"
            >
              Contact Us
            </Button>
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
          }}  
        >
          <Box sx={{ width: "100%", height: "auto", borderRadius: 2, overflow: "hidden" }}>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
              style={{ borderRadius: 8 }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Furry Friends ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;