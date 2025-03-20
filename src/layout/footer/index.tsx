import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";

// Using MusicNote as a placeholder for TikTok

import LOGO_HOMECARE from '../../assets/icons/HomeCareLogo.png'
// Define colors
const FOOTER_PURPLE = "#611463";

const Footer = () => {
  return (
    <Box component="footer">
      {/* Main Footer */}
      <Box
        sx={{
          bgcolor: FOOTER_PURPLE,
          pt: 5,
          pb: 5,
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo and Tagline Column */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <img 
                  src={LOGO_HOMECARE}
                  alt="HomeCare Logo " 
                  style={{ maxWidth: "150px" }} 
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                HomeCare, Take care of your Home, Complete Service, Take care of your home at your place
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {/* Facebook with link */}
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)"
                    },
                    transition: "all 0.3s"
                  }}
                  component="a"
                  href="https://www.facebook.com/profile.php?id=100078827647904"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                
                {/* YouTube with placeholder link */}
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)"
                    },
                    transition: "all 0.3s"
                  }}
                  component="a"
                  href="https://www.youtube.com/@imnokia.8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
                
                {/* TikTok with placeholder link */}
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)"
                    },
                    transition: "all 0.3s"
                  }}
                  component="a"
                  href="https://www.tiktok.com/@canicallyoubabyy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TikTokIcon fontSize="small" />
                </IconButton>
                
                {/* Instagram with placeholder link */}
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)"
                    },
                    transition: "all 0.3s"
                  }}
                  component="a"
                  href="https://www.instagram.com/imnokia_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                
                {/* LinkedIn with placeholder link */}
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)"
                    },
                    transition: "all 0.3s"
                  }}
                  component="a"
                  href="https://th.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                HomeCare
              </Typography>
              <Stack spacing={1}>
                <Link href="/home" color="inherit" underline="hover">
                  Home
                </Link>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact Us
                </Link>
                <Link href="/privacy" color="inherit" underline="hover">
                  Privacy policy
                </Link>
              </Stack>
            </Grid>

            {/* Contact Column */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                GET IN TOUCH
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon sx={{ mr: 1, color: "white" }} />
                  <Typography variant="body1">+856-20-5482-1624</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon sx={{ mr: 1, color: "white" }} />
                  <Typography variant="body1">
                    homecaredolaebn@gmail.com
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Copyright Bar */}
      <Box
        sx={{
          bgcolor: FOOTER_PURPLE,
          py: 2,
          px: 3,
          color: "white",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          Copyright 2025 @ HomeCare.com - All Rights Reserved By HomeCare.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;