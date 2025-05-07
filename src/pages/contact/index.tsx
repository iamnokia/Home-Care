import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";
import HistoryIcon from "@mui/icons-material/History";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";

// Interface definitions
interface StarPoint {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  pulsate: number;
  color: string;
}

interface RocketPosition {
  x: number;
  y: number;
  angle: number;
  scale: number;
  targetX: number;
  targetY: number;
}

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Star field and animation states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<StarPoint[]>([]);
  const [rocket, setRocket] = useState<RocketPosition>({
    x: -50,
    y: 110,
    angle: -25,
    scale: 1,
    targetX: 120,
    targetY: -20
  });
  const animationRef = useRef<number>(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Initialize star field
  useEffect(() => {
    // Generate random stars
    const newStars: StarPoint[] = [];
    
    // Main small stars (lots of these)
    for (let i = 0; i < 180; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        pulsate: Math.random() * 2,
        color: 'white'
      });
    }
    
    // Medium bright stars (fewer)
    for (let i = 0; i < 30; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 2,
        opacity: Math.random() * 0.3 + 0.6,
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.01,
        pulsate: Math.random() * 3,
        color: Math.random() > 0.7 ? 'rgba(255, 255, 255, 0.9)' : (Math.random() > 0.5 ? 'rgba(247, 220, 180, 0.9)' : 'rgba(200, 220, 255, 0.9)')
      });
    }
    
    // Large bright stars (very few)
    for (let i = 0; i < 10; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 3,
        opacity: Math.random() * 0.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: (Math.random() - 0.5) * 0.005,
        pulsate: Math.random() * 4,
        color: 'white'
      });
    }
    
    setStars(newStars);
  }, []);

  // Star field animation and interactivity
  useEffect(() => {
    if (!containerRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateCanvasSize = () => {
      if (!containerRef.current || !canvas) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let time = 0;
    
    const drawStars = () => {
      if (!ctx || !canvas) return;
      time += 0.01;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update star positions
      const updatedStars = stars.map(star => {
        // Pulsating effect for stars
        const pulseFactor = Math.sin(time + star.pulsate) * 0.2 + 0.8;
        
        return {
          ...star,
          x: (star.x + star.speedX + 100) % 100,
          y: (star.y + star.speedY + 100) % 100,
          pulsate: star.pulsate,
          opacity: star.opacity * pulseFactor,
        };
      });
      
      setStars(updatedStars);
      
      // Get mouse position in canvas coordinates
      const mouseX = (mousePos.x / 100) * canvas.width;
      const mouseY = (mousePos.y / 100) * canvas.height;
      
      // Draw stars with connections to mouse
      updatedStars.forEach(star => {
        const x = (star.x / 100) * canvas.width;
        const y = (star.y / 100) * canvas.height;
        
        // Draw star with glow
        const starSize = star.size * (Math.sin(time + star.pulsate) * 0.2 + 0.8);
        
        // Star glow
        if (star.size > 1.5) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, starSize * 4);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.7})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.2})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(x, y, starSize * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // For large stars, add cross flare
          if (star.size > 2.5) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(time * 0.2);
            
            // Horizontal flare
            ctx.beginPath();
            ctx.moveTo(-starSize * 6, 0);
            ctx.lineTo(starSize * 6, 0);
            ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`;
            ctx.lineWidth = starSize * 0.5;
            ctx.stroke();
            
            // Vertical flare
            ctx.beginPath();
            ctx.moveTo(0, -starSize * 6);
            ctx.lineTo(0, starSize * 6);
            ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`;
            ctx.lineWidth = starSize * 0.5;
            ctx.stroke();
            
            ctx.restore();
          }
        }
        
        // Draw star core
        ctx.beginPath();
        ctx.arc(x, y, starSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color || `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Draw connection to mouse if close enough
        if (mouseX > 0 && mouseY > 0) {
          const distToMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          );
          
          // Only draw connections if star is within 180px radius of mouse
          if (distToMouse < 180) {
            // Calculate opacity based on distance
            const lineOpacity = (1 - distToMouse / 180) * 0.6;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mouseX, mouseY);
            
            // Create gradient for the line
            const gradient = ctx.createLinearGradient(x, y, mouseX, mouseY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${lineOpacity * 0.8})`);
            gradient.addColorStop(1, `rgba(247, 147, 30, ${lineOpacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8 * (1 - distToMouse / 180);
            ctx.stroke();
            
            // Add subtle glow around connected stars
            ctx.beginPath();
            ctx.arc(x, y, star.size * 2.5, 0, Math.PI * 2);
            const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2.5);
            glowGradient.addColorStop(0, `rgba(247, 147, 30, ${lineOpacity * 0.5})`);
            glowGradient.addColorStop(1, 'rgba(247, 147, 30, 0)');
            ctx.fillStyle = glowGradient;
            ctx.fill();
          }
        }
      });
      
      // Draw mouse cursor glow
      if (mouseX > 0 && mouseY > 0) {
        // Add subtle glow around cursor
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2);
        const cursorGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 20);
        cursorGradient.addColorStop(0, 'rgba(247, 147, 30, 0.3)');
        cursorGradient.addColorStop(1, 'rgba(247, 147, 30, 0)');
        ctx.fillStyle = cursorGradient;
        ctx.fill();
      }
      
      // Update and draw rocket
      const updatedRocket = { ...rocket };
      
      // Calculate direction to target
      const dx = (updatedRocket.targetX - updatedRocket.x) * 0.005;
      const dy = (updatedRocket.targetY - updatedRocket.y) * 0.005;
      
      // Update position
      updatedRocket.x += dx;
      updatedRocket.y += dy;
      
      // Update angle (pointing in direction of movement)
      updatedRocket.angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Reset rocket if it's off-screen
      if (updatedRocket.x > 120 || updatedRocket.x < -20 || updatedRocket.y > 120 || updatedRocket.y < -20) {
        // Choose a new starting position and target
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        
        if (side === 0) { // Enter from top
          updatedRocket.x = Math.random() * 100;
          updatedRocket.y = -10;
          updatedRocket.targetX = Math.random() * 100;
          updatedRocket.targetY = 110;
        } else if (side === 1) { // Enter from right
          updatedRocket.x = 110;
          updatedRocket.y = Math.random() * 100;
          updatedRocket.targetX = -10;
          updatedRocket.targetY = Math.random() * 100;
        } else if (side === 2) { // Enter from bottom
          updatedRocket.x = Math.random() * 100;
          updatedRocket.y = 110;
          updatedRocket.targetX = Math.random() * 100;
          updatedRocket.targetY = -10;
        } else { // Enter from left
          updatedRocket.x = -10;
          updatedRocket.y = Math.random() * 100;
          updatedRocket.targetX = 110;
          updatedRocket.targetY = Math.random() * 100;
        }
        
        updatedRocket.scale = 4 + Math.random() * 2;
      }
      
      setRocket(updatedRocket);
      
      // Convert rocket position to canvas coordinates
      const rocketX = (updatedRocket.x / 100) * canvas.width;
      const rocketY = (updatedRocket.y / 100) * canvas.height;
      
      // Draw rocket
      ctx.save();
      ctx.translate(rocketX, rocketY);
      ctx.rotate((updatedRocket.angle + 90) * Math.PI / 180);
      ctx.scale(updatedRocket.scale, updatedRocket.scale);
      
      // Rocket body
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(8, 15);
      ctx.lineTo(-8, 15);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
      
      // Rocket window
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#611463';
      ctx.fill();
      
      // Rocket flame
      const flameHeight = 10 + Math.sin(time * 10) * 3;
      ctx.beginPath();
      ctx.moveTo(-5, 15);
      ctx.lineTo(0, 15 + flameHeight);
      ctx.lineTo(5, 15);
      ctx.closePath();
      const flameGradient = ctx.createLinearGradient(0, 15, 0, 15 + flameHeight);
      flameGradient.addColorStop(0, '#f7931e');
      flameGradient.addColorStop(1, 'rgba(247, 147, 30, 0)');
      ctx.fillStyle = flameGradient;
      ctx.fill();
      
      // Rocket trail
      ctx.beginPath();
      ctx.moveTo(0, 15 + flameHeight);
      
      // Wavy trail
      for (let i = 1; i <= 10; i++) {
        const trailX = Math.sin(time * 10 + i) * (i / 2);
        const trailY = 15 + flameHeight + i * 4;
        ctx.lineTo(trailX, trailY);
      }
      
      const trailGradient = ctx.createLinearGradient(0, 15 + flameHeight, 0, 15 + flameHeight + 40);
      trailGradient.addColorStop(0, 'rgba(247, 147, 30, 0.7)');
      trailGradient.addColorStop(0.3, 'rgba(247, 147, 30, 0.3)');
      trailGradient.addColorStop(1, 'rgba(247, 147, 30, 0)');
      
      ctx.strokeStyle = trailGradient;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
      
      animationRef.current = requestAnimationFrame(drawStars);
    };
    
    drawStars();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [stars, mousePos, rocket]);

  // Track mouse position for interactive effect
  useEffect(() => {
    if (!containerRef.current || isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: -100, y: -100 }); // Move cursor off-screen
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Enhanced Hero Section with Star Field and Rockets */}
      <Box
        ref={containerRef}
        sx={{
          background: "linear-gradient(135deg, #611463 0%, #4a0d4c 100%)",
          py: { xs: 8, md: 12 },
          position: "relative",
          mb: { xs: 12, md: 16 },
          overflow: "hidden",
          perspective: "1000px",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, rgba(74, 13, 76, 0) 0%, #3a0a3c 100%)',
            opacity: 0.7,
            zIndex: 0,
          },
        }}
      >
        {/* Canvas for star field and rocket animations */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={7}>
              <Box sx={{ color: "#fff", textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    mb: 2,
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-10px",
                      left: 0,
                      width: { xs: "80%", md: "60%" },
                      height: "4px",
                      background: "linear-gradient(90deg, #f7931e, transparent)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  ຂໍ້ມູນການຕິດຕໍ່
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={400}
                  sx={{
                    mt: 4,
                    mb: 3,
                    opacity: 0.9,
                    maxWidth: "90%",
                    mx: { xs: "auto", md: 0 },
                    textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  HomeCare - ດູແລບ້ານ, ຄົບທຸກບໍລິການ, ດູແລບ້ານທ່ານເຖິງທີ່
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "150%",
                    height: "150%",
                    top: "-25%",
                    left: "-25%",
                    background: "radial-gradient(circle, rgba(247, 147, 30, 0.2) 0%, rgba(247, 147, 30, 0) 70%)",
                    borderRadius: "50%",
                    animation: "pulse 3s ease-in-out infinite alternate",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(0.8)", opacity: 0.3 },
                      "100%": { transform: "scale(1)", opacity: 0.6 },
                    },
                  }
                }}
              >
                <img
                  src={LOGO_HOMECARE}
                  alt="HomeCare Logo"
                  style={{
                    maxWidth: "220px",
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                    animation: "float 6s ease-in-out infinite",
                    position: "relative",
                    zIndex: 3,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Floating Contact Cards */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 3,
            mt: 8
          }}
        >
          <Box
            sx={{
              transform: "translateY(50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 3 },
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
                  width: { xs: "100%", sm: "280px", md: "30%" },
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 30px rgba(247, 147, 30, 0.2)"
                  },
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "6px",
                    height: "100%",
                    background: contact.color,
                    borderRadius: "4px 0 0 4px",
                  }
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: contact.color,
                      width: 70,
                      height: 70,
                      mb: 2,
                      mx: "auto",
                      boxShadow: `0 8px 20px ${contact.color}50`,
                      transform: "translateY(-5px)",
                      "& .MuiSvgIcon-root": {
                        fontSize: 35
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
                {/* Decorative element */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${contact.color}20 0%, ${contact.color}05 70%, transparent 100%)`,
                  }}
                />
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