import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Divider,
  Paper,
  Avatar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";
import SendIcon from "@mui/icons-material/Send";
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero Header with Gradient */}
      <Box 
        sx={{ 
          background: "linear-gradient(45deg, #611463 30%, #f7931e 90%)",
          py: { xs: 4, md: 6 }, 
          borderRadius: { xs: 0, md: "0 0 30px 30px" },
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="center" spacing={3}>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography 
                variant="h3" 
                fontWeight={700} 
                color="#fff"
                sx={{ 
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
                }}
              >
                Contact Us
              </Typography>
              <Typography 
                variant="h6" 
                color="rgba(255,255,255,0.9)"
                sx={{ 
                  mt: 1,
                  fontWeight: 400,
                  maxWidth: "90%",
                  mx: { xs: "auto", md: 0 }
                }}
              >
                We're here to help with all your home maintenance needs
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
              <img 
                src={LOGO_HOMECARE} 
                alt="HomeCare Logo" 
                style={{ 
                  maxWidth: isMobile ? "120px" : "180px",
                  filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))"
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Contact Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                borderRadius: 4, 
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
                }
              }}
            >
              <Box sx={{ bgcolor: "#611463", color: "#fff", p: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  Get in Touch
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Have questions or need assistance? Send us a message!
                </Typography>
              </Box>
              
              <CardContent sx={{ p: 4 }}>
                <Box component="form" noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Full Name" 
                        variant="outlined" 
                        required
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            "&:hover": {
                              borderColor: "#f7931e"
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Phone Number" 
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Email Address" 
                        variant="outlined" 
                        required
                        InputProps={{
                          sx: {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Subject" 
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Your Message" 
                        multiline 
                        rows={5} 
                        variant="outlined" 
                        required
                        InputProps={{
                          sx: {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        endIcon={<SendIcon />}
                        sx={{ 
                          mt: 1,
                          py: 1.5,
                          px: 4,
                          borderRadius: 2,
                          background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                          boxShadow: "0 3px 5px 2px rgba(97, 20, 99, .3)",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 10px 2px rgba(97, 20, 99, .4)"
                          }
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Paper>
          </Grid>

          {/* Contact Info and Social Media */}
          <Grid item xs={12} md={5}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: 4, 
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              {/* Company Info */}
              <Box 
                sx={{ 
                  background: "linear-gradient(45deg, #611463 10%, #ffa726 100%)",
                  color: "#fff", 
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <img 
                  src={LOGO_HOMECARE} 
                  alt="HomeCare Logo" 
                  style={{ 
                    maxWidth: "100px", 
                    marginBottom: "16px",
                    filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.2))"
                  }} 
                />
                <Typography 
                  sx={{ 
                    fontSize: "1.8rem", 
                    fontWeight: 700, 
                    textAlign: "center" 
                  }}
                >
                  <span style={{ color: "#611463" }}>Home</span>
                  <span style={{ color: "#fff" }}>Care</span>
                </Typography>
              </Box>

              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
                  HomeCare provides top-notch home maintenance services with skilled professionals to ensure comfort 
                  and reliability for all your household needs.
                </Typography>

                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  sx={{ 
                    mb: 2, 
                    color: "#611463", 
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -5,
                      width: 40,
                      height: 3,
                      background: "#f7931e",
                      borderRadius: 2
                    }
                  }}
                >
                  Contact Information
                </Typography>

                <Stack spacing={3} sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "rgba(97, 20, 99, 0.1)", 
                        color: "#611463",
                        mr: 2
                      }}
                    >
                      <PhoneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1" fontWeight={500}>+856-20-5482-1624</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "rgba(97, 20, 99, 0.1)", 
                        color: "#611463",
                        mr: 2
                      }}
                    >
                      <EmailIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1" fontWeight={500}>homecaredolaebn@gmail.com</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "rgba(97, 20, 99, 0.1)", 
                        color: "#611463",
                        mr: 2
                      }}
                    >
                      <LocationOnIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Location</Typography>
                      <Typography variant="body1" fontWeight={500}>Vientiane, Laos</Typography>
                    </Box>
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  sx={{ 
                    mb: 2, 
                    color: "#611463",
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -5,
                      width: 40,
                      height: 3,
                      background: "#f7931e",
                      borderRadius: 2
                    }
                  }}
                >
                  Connect With Us
                </Typography>

                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {[
                    { icon: <FacebookIcon />, url: "https://www.facebook.com/profile.php?id=100078827647904", color: "#1877f2" },
                    { icon: <InstagramIcon />, url: "https://www.instagram.com/imnokia_/", color: "#e4405f" },
                    { icon: <YouTubeIcon />, url: "https://www.youtube.com/@imnokia.8", color: "#ff0000" },
                    { icon: <LinkedInIcon />, url: "https://th.linkedin.com/", color: "#0077b5" },
                    { icon: <TikTokIcon />, url: "https://www.tiktok.com/@canicallyoubabyy", color: "#000000" }
                  ].map((social, index) => (
                    <Grid item key={index}>
                      <Button
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        sx={{
                          minWidth: "auto",
                          p: 1.5,
                          bgcolor: "rgba(97, 20, 99, 0.1)",
                          color: social.color,
                          borderRadius: 2,
                          "&:hover": {
                            bgcolor: social.color,
                            color: "#fff"
                          }
                        }}
                      >
                        {social.icon}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;