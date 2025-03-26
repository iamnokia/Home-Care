import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Paper,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandymanIcon from "@mui/icons-material/Handyman";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HistoryIcon from "@mui/icons-material/History";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Modern Hero Section with Floating Cards */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #611463 0%, #8e24aa 50%, #f7931e 100%)",
          py: { xs: 6, md: 10 },
          position: "relative",
          mb: { xs: 12, md: 16 }
        }}
      >
        {/* Background SVG Shapes */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.1,
            zIndex: 0
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5%" cy="20%" r="80" fill="#ffffff" />
            <circle cx="20%" cy="70%" r="120" fill="#ffffff" />
            <circle cx="70%" cy="15%" r="100" fill="#ffffff" />
            <circle cx="85%" cy="60%" r="160" fill="#ffffff" />
          </svg>
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ color: "#fff", textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    mb: 2
                  }}
                >
                  ຂໍ້ມູນການຕິດຕໍ່
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={400}
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    maxWidth: "90%",
                    mx: { xs: "auto", md: 0 }
                  }}
                >
                  HomeCare - ດູແລບ້ານ, ຄົບທຸກບໍລິການ, ດູແລບ້ານທ່ານເຖິງທີ່
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <img
                src={LOGO_HOMECARE}
                alt="HomeCare Logo"
                style={{
                  maxWidth: "220px",
                  filter: "drop-shadow(5px 5px 10px rgba(0,0,0,0.3))"
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Floating Contact Cards */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            mt: 6
          }}
        >
          <Box
            sx={{
              transform: "translateY(50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 0 },
              justifyContent: "center"
            }}
          >
            {[
              {
                icon: <PhoneIcon fontSize="large" />,
                title: "ໂທ",
                details: "+856-20-5482-1624",
                subtext: "ພ້ອມໃຫ້ບໍລິການ 24/7 ທຸກກໍລະນີສຸກເສີນ",
                color: "#611463"
              },
              {
                icon: <EmailIcon fontSize="large" />,
                title: "ອີເມລ",
                details: "homecaredolaebn@gmail.com",
                subtext: "ພວກເຮົາຈະຕອບກັບທ່ານພາຍໃນ 24 ຊົ່ວໂມງ",
                color: "#8e24aa"
              },
              {
                icon: <LocationOnIcon fontSize="large" />,
                title: "ທີ່ຢູ່",
                details: "ຖະໜົນທ່າເດືອ, ຫາຍໂສກ, ສີສັດຕະນາກ",
                subtext: "ເປີດໃຫ້ບໍລິການ ຈັນ-ສຸກ, 9ໂມງເຊົ້າ-5ໂມງແລງ",
                color: "#f7931e"
              }
            ].map((contact, index) => (
              <Paper
                key={index}
                elevation={10}
                sx={{
                  p: 3,
                  width: { xs: "100%", sm: "280px", md: "31%" },
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: contact.color,
                      width: 60,
                      height: 60,
                      mb: 2,
                      mx: "auto",
                      "& .MuiSvgIcon-root": {
                        fontSize: 30
                      }
                    }}
                  >
                    {contact.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {contact.title}
                  </Typography>
                  <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
                    {contact.details}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {contact.subtext}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>


      {/* Working Hours Section */}
      <Box sx={{ bgcolor: "#f0f2f5", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                fontWeight={700}
                color="#611463"
                sx={{ mb: 3 }}
              >
                ຂໍ້ມູນເພີ່ມເຕີມ
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "#555",
                  fontWeight: 400
                }}
              >
                ພວກເຮົາຈະຢູ່ບ່ອນນີ້ເມື່ອທ່ານຕ້ອງການພວກເຮົາ
              </Typography>

              <List sx={{ width: "100%" }}>
                {[
                  { day: "ຈັນ - ສຸກ", hours: "9:00 AM - 5:00 PM", icon: <HistoryIcon color="primary" /> },
                  { day: "ເສົາ", hours: "9:00 AM - 5:00 PM", icon: <HistoryIcon color="primary" /> },
                  { day: "ອາທິດ", hours: "10:00 AM - 3:00 PM (ມີການບໍລິການພິເສດ)", icon: <HistoryIcon color="primary" /> },
                  { day: "ຕິດຕໍ່ສຸກເສີນ", hours: "ທຸກເວລາ 24/7", icon: <PhoneIcon sx={{ color: "#f7931e" }} /> }
                ].map((time, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1.5,
                      borderBottom: index !== 3 ? "1px dashed rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    <ListItemIcon>
                      {time.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={time.day}
                      secondary={time.hours}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: "#333"
                      }}
                      secondaryTypographyProps={{
                        fontWeight: 500,
                        color: index === 3 ? "#f7931e" : "#611463"
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={5}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: "#fff",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "150px",
                    height: "150px",
                    bgcolor: "rgba(247, 147, 30, 0.1)",
                    borderRadius: "0 0 0 100%"
                  }}
                />
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="#611463"
                  sx={{ mb: 3 }}
                >
                  ກໍລະນີສຸກເສີນ?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 4, color: "#555" }}
                >
                  ພວກເຮົາເຂົ້າໃຈວ່າເຫດສຸກເສີນໃນບ້ານອາດເກີດໄດ້ທຸກເວລາ. ນັ້ນແມ່ນເຫດຜົນທີ່ທີມງານຂອງເຮົາພ້ອມທີ່ຈະຊ່ວຍເຫຼືອກໍລະນີສຸກເສີນ, ພວກເຮົາພ້ອມ 24/7 ເພື່ອແກ້ໄຂກັບສະຖານະການນັ້ນຢ່າງຮີບດ່ວນ.                </Typography>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "#611463",
                    color: "#fff",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 10px 20px rgba(97, 20, 99, 0.3)"
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="body2">ເບີໂທສາຍດ່ວນ</Typography>
                    <Typography variant="h5" fontWeight={700}>
                      +856-20-5482-1624
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Location */}
      <Box sx={{ bgcolor: "#f0f2f5", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                fontWeight={700}
                color="#611463"
                sx={{ mb: 3 }}
              >
                ທີ່ຢູ່
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "#555" }}
              >
                ຫ້ອງການຂອງພວກເຮົາຕັ້ງຢູ່ໃນໃຈກາງນະຄອນຫຼວງວຽງຈັນ, ເຂົ້າເຖິງໄດ້ງ່າຍຈາກທຸກພື້ນທີ່ຂອງຕົວເມືອງ.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 2, color: "#611463" }}
                >
                  ສະຖານທີ່ຕັ້ງ
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <AddLocationIcon sx={{ color: "#f7931e", mr: 2, mt: 0.5 }} />
                  <Typography variant="body1">
                    ຖະໜົນທ່າເດືອ, <br />
                    ບ້ານຫາຍໂສກ, ເມືອງສີສັດຕະນາກ <br />
                    ນະຄອນຫຼວງວຽງຈັນ, ລາວ
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 2, color: "#611463" }}
                >
                  ເຂດໃກ້ຄຽງ
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  • 20 ນາທີ, ຈາກສະໜາມບິນສາກົນວັດໄຕ <br />
                  • 10 ນາທີ່, ຈາກປະຕູໄຊ <br />
                  • ໃກ້ກັບມະຫາວິທະຍາໄລແຫ່ງຊາດ, ຄະນະວິສະວະກຳສາດ
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={5}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  height: "350px",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                }}
              >
                {/* Map Placeholder - Replace with Google Maps in production */}
                <Box
                  sx={{
                    bgcolor: "#e9ecef",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <Box sx={{ textAlign: "center", maxWidth: "80%" }}>
                    <AddLocationIcon sx={{ fontSize: 60, color: "#611463", mb: 2 }} />
                    <Typography variant="h6" color="#555" sx={{ mb: 1 }}>
                      ສະຖານທີ່
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<OpenInNewIcon />}
                      href="https://www.google.com/maps/place/Phalome%E2%80%99s+Cafe/@17.9169089,102.6128964,3682m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3124650054f6f2ab:0x8b4719427d8c7e9a!8m2!3d17.9168888!4d102.6231961!16s%2Fg%2F11wqfwxzyx?authuser=0&entry=ttu&g_ep=EgoyMDI1MDMyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: "#611463",
                        "&:hover": { bgcolor: "#4e1050" },
                        textTransform: "none",
                        borderRadius: 2
                      }}
                    >
                      ເປີດໃນ Google Maps
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Social Media Connect */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight={700}
          color="#611463"
          sx={{
            mb: 2,
            textAlign: "center"
          }}
        >
          ເຊື່ອມຕໍ່ກັບພວກເຮົາ
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            textAlign: "center",
            maxWidth: "700px",
            mx: "auto",
            color: "#555"
          }}
        >
          ຕິດຕາມພວກເຮົາໃນສື່ສັງຄົມສໍາລັບຄໍາແນະນໍາການບໍາລຸງຮັກສາເຮືອນ, ການປັບປຸງການບໍລິການ, ແລະໂປໂມຊັ່ນພິເສດ
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          {[
            { icon: <FacebookIcon sx={{ fontSize: 30 }} />, platform: "Facebook", username: "@HomeCareVientiane", url: "https://www.facebook.com/profile.php?id=100078827647904", color: "#1877F2" },
            { icon: <InstagramIcon sx={{ fontSize: 30 }} />, platform: "Instagram", username: "@HomeCareLaos", url: "https://www.instagram.com/imnokia_/", color: "#E4405F" },
            { icon: <YouTubeIcon sx={{ fontSize: 30 }} />, platform: "YouTube", username: "HomeCare Laos", url: "https://www.youtube.com/@imnokia.8", color: "#FF0000" },
            { icon: <LinkedInIcon sx={{ fontSize: 30 }} />, platform: "LinkedIn", username: "HomeCare Services", url: "https://th.linkedin.com/", color: "#0A66C2" },
            { icon: <TikTokIcon sx={{ fontSize: 30 }} />, platform: "TikTok", username: "@HomeCare.Laos", url: "https://www.tiktok.com/@canicallyoubabyy", color: "#000000" }
          ].map((social, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 10px 20px rgba(${social.color === "#000000" ? "0,0,0" : social.color.replace(/[^\d,]/g, '')}, 0.15)`
                  },
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: social.color,
                    mr: 2,
                    width: 50,
                    height: 50
                  }}
                >
                  {social.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                    {social.platform}
                  </Typography>
                  <Button
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: social.color,
                      p: 0,
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": {
                        bgcolor: "transparent",
                        textDecoration: "underline"
                      }
                    }}
                  >
                    {social.username}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;