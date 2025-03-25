import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import LOGO_HOMECARE from '../../assets/icons/HomeCareLogo.png';
import { CONTACT_US_PATH, SERVICE_PATH, TERMS_PRIVACY_PATH } from "../../routes/path";

// Define colors
const FOOTER_PURPLE = "#611463";
const FOOTER_ORANGE = "#f7931e";

// Define navigation links with placeholder routes
const QUICK_LINKS = [
  { label: "ໜ້າຫຼັກ", path: '/' },
  { label: "ການບໍລິການ", path: SERVICE_PATH },
  { label: "ກ່ຽວກັບພວກເຮົາ", path: CONTACT_US_PATH },
  { label: "ຕິດຕໍ່ພວກເຮົາ", path: CONTACT_US_PATH },
  { label: "ນນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ", path: TERMS_PRIVACY_PATH },
];

// Define social media links with placeholder URLs
const SOCIAL_LINKS = [
  { icon: <FacebookIcon />, url: "https://www.facebook.com/profile.php?id=100078827647904" },
  { icon: <YouTubeIcon />, url: "https://www.youtube.com/@imnokia.8" },
  { icon: <TikTokIcon />, url: "https://www.tiktok.com/@canicallyoubabyy" },
  { icon: <InstagramIcon />, url: "https://www.instagram.com/imnokia_/" },
  { icon: <LinkedInIcon />, url: "https://th.linkedin.com/" }
];

// Define footer links for copyright section
const FOOTER_LINKS = [
  { label: "ເງື່ອນໄຂການນຳໃຊ້", path: TERMS_PRIVACY_PATH },
  { label: "ນະໂຍບາຍຄວາມເປັນສ່ວນໂຕ", path: TERMS_PRIVACY_PATH },
];

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box component="footer">
      {/* Wave Separator - medium height */}
      <Box
        sx={{
          height: "50px", // Medium between original (100px) and compact (40px)
          width: "100%",
          overflow: "hidden",
          transform: "translateY(1px)",
          background: "#f8f9fa",
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: FOOTER_PURPLE }}
          ></path>
        </svg>
      </Box>

      {/* Main Footer - moderate padding */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${FOOTER_PURPLE} 0%, #7b1a7c 100%)`,
          pt: { xs: 1.5, md: 2.5 }, // Moderate padding
          pb: { xs: 1.5, md: 2.5 }, // Moderate padding
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements - kept but made smaller */}
        <Box
          sx={{
            position: "absolute",
            width: "200px", // Reduced from 300px
            height: "200px", // Reduced from 300px
            borderRadius: "50%",
            background: `radial-gradient(circle, ${FOOTER_ORANGE}22 0%, transparent 70%)`,
            top: "-120px",
            right: "-80px",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: "150px", // Reduced from 200px
            height: "150px", // Reduced from 200px
            borderRadius: "50%",
            background: `radial-gradient(circle, ${FOOTER_ORANGE}22 0%, transparent 70%)`,
            bottom: "-80px",
            left: "10%",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={2}> {/* Medium spacing */}
            {/* Logo and Description Column */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
                <img
                  src={LOGO_HOMECARE}
                  alt="HomeCare Logo"
                  style={{
                    maxWidth: "100px", // Medium size between original and compact
                    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))"
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    color: "#fff",
                    textAlign: { xs: "center", md: "left" },
                    fontSize: "1.2rem", // Medium size
                  }}
                >
                  <span style={{ color: "#fff" }}>Home</span>
                  <span style={{ color: FOOTER_ORANGE }}>Care</span>
                </Typography>
              </Box>

              <Typography
                variant="body2" // Medium size between original body1 and caption
                sx={{
                  mb: 1, // Medium margin
                  maxWidth: "90%",
                  textAlign: { xs: "center", md: "left" },
                  mx: { xs: "auto", md: 0 },
                  lineHeight: 1.4, // Medium line height
                }}
              >
                ຄົບທຸກບໍລິການ ດູແລບ້ານທ່ານເຖິງທີ່
              </Typography>

              <Box
                sx={{
                  mb: 1, // Medium margin
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    color: FOOTER_ORANGE,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  ເຊື່ອມຕໍ່ກັບພວກເຮົາ
                </Typography>

                <Stack
                  direction="row"
                  spacing={0.75} // Medium spacing
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" }
                  }}
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <IconButton
                      key={index}
                      size="small"
                      sx={{
                        padding: 0.75, // Medium padding
                        color: "white",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                          bgcolor: FOOTER_ORANGE,
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
                        },
                        transition: "all 0.3s"
                      }}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="subtitle2" // Medium size
                sx={{
                  mb: { xs: 0.75, md: 1 }, // Medium margin
                  fontWeight: 700,
                  color: "white",
                  textAlign: { xs: "center", md: "left" },
                  position: "relative",
                  display: "inline-block",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: { xs: "calc(50% - 15px)", md: 0 },
                    width: 30,
                    height: 2,
                    backgroundColor: FOOTER_ORANGE,
                    borderRadius: 1,
                  }
                }}
              >
                ກ່ຽວກັບພວກເຮົາ
              </Typography>

              <Stack
                spacing={0.75} // Medium spacing
                sx={{
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                {QUICK_LINKS.map((link, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateX(3px)",
                      }
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        fontSize: 10,
                        mr: 0.5,
                        color: FOOTER_ORANGE
                      }}
                    />
                    <Link
                      href={link.path}
                      color="inherit"
                      underline="hover"
                      sx={{
                        fontSize: "0.8125rem", // Medium size
                        transition: "all 0.3s",
                        "&:hover": {
                          color: FOOTER_ORANGE,
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Contact Column */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="subtitle2" // Medium size
                sx={{
                  mb: { xs: 0.75, md: 1 }, // Medium margin
                  fontWeight: 700,
                  color: "white",
                  textAlign: { xs: "center", md: "left" },
                  position: "relative",
                  display: "inline-block",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: { xs: "calc(50% - 15px)", md: 0 },
                    width: 30,
                    height: 2,
                    backgroundColor: FOOTER_ORANGE,
                    borderRadius: 1,
                  }
                }}
              >
                ຕິດຕໍ່ພວກເຮົາ
              </Typography>

              <Stack
                spacing={1} // Medium spacing
                sx={{
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32, // Medium size
                      height: 32, // Medium size
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      mr: 1.5,
                    }}
                  >
                    <PhoneIcon sx={{ color: FOOTER_ORANGE, fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.25 }}>
                      ໂທ
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      +856-20-5482-1624
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32, // Medium size
                      height: 32, // Medium size
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      mr: 1.5,
                    }}
                  >
                    <EmailIcon sx={{ color: FOOTER_ORANGE, fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.25 }}>
                      ອີເມລ
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      homecaredolaebn@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32, // Medium size
                      height: 32, // Medium size
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      mr: 1.5,
                    }}
                  >
                    <LocationOnIcon sx={{ color: FOOTER_ORANGE, fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.25 }}>
                      ສະຖານທີ່
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ຖະໜົນທ່າເດື່ອ, ບ້ານຫາຍໂສກ, ເມືອງສີສັດຕະນາກ, ນະຄອນຫຼວງວຽງຈັນ
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Copyright Bar - medium padding */}
      <Box
        sx={{
          bgcolor: `${FOOTER_PURPLE}e0`,
          py: 1.25, // Medium padding
          px: { xs: 2, md: 3 },
          color: "white",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          gap: 0.75,
        }}
      >
        <Typography variant="body2">
          Copyright 2025 © <b>HomeCare.com</b> - All Rights Reserved
        </Typography>

        <Typography variant="body2">
          {FOOTER_LINKS.map((link, index) => (
            <React.Fragment key={index}>
              <Link href={link.path} color="inherit" underline="hover" sx={{ mx: 0.75 }}>
                {link.label}
              </Link>
              {index < FOOTER_LINKS.length - 1 && (
                <Divider orientation="vertical" flexItem sx={{ display: "inline-block", mx: 0.75, bgcolor: "rgba(255,255,255,0.3)" }} />
              )}
            </React.Fragment>
          ))}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;