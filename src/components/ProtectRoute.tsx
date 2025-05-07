// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Fade, 
  Zoom,
  useMediaQuery,
  useTheme
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import ShieldIcon from "@mui/icons-material/Shield";
import TimerIcon from "@mui/icons-material/Timer";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

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

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [hoverEffect, setHoverEffect] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // Interactive particle effect on mouse move
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loggedIn) {
      setShowMessage(true);
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      
      // Auto-hide message after showing for 20 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
        // After the fade-out animation completes, redirect
        setTimeout(() => {
          navigate("/");
        }, 500);
      }, 20000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [loggedIn, navigate]);

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
    if (!containerRef.current || !showMessage) return;
    
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
  }, [stars, mousePos, rocket, showMessage]);

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

  // Circle progress animation
  useEffect(() => {
    if (progressRef.current) {
      const percentage = ((20 - countdown) / 20) * 100;
      progressRef.current.style.background = `conic-gradient(
        #f7931e ${percentage}%, 
        rgba(255, 255, 255, 0.2) ${percentage}%
      )`;
    }
  }, [countdown]);

  const handleLogin = () => {
    // Navigate to home with URL parameter to trigger login dialog
    navigate("/?login=true");
  };

  if (!loggedIn) {
    return (
      <Fade in={showMessage} timeout={800}>
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            p: 3,
            bgcolor: "#611463",
            background: "linear-gradient(135deg, #611463 0%, #4a0d4c 100%)",
            position: "relative",
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
          {/* Canvas for star field and connections */}
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

          <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
            <Paper
              elevation={24}
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                maxWidth: 600,
                width: "100%",
                bgcolor: "#ffffff",
                boxShadow: hoverEffect 
                  ? "0 25px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(247, 147, 30, 0.3)" 
                  : "0 20px 50px rgba(0, 0, 0, 0.2), 0 0 30px rgba(247, 147, 30, 0.2)",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
                overflow: "hidden",
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: hoverEffect ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  background: "linear-gradient(90deg, #611463, #f7931e)",
                },
              }}
            >
              {/* Countdown circular progress */}
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  ref={progressRef}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    position: "absolute",
                    background: "conic-gradient(#f7931e 0%, rgba(255, 255, 255, 0.2) 0%)",
                    transition: "background 0.3s ease",
                  }}
                />
                <Box
                  sx={{
                    width: "calc(100% - 6px)",
                    height: "calc(100% - 6px)",
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    left: "3px",
                    top: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: countdown <= 5 ? "#f7931e" : "#611463",
                      transition: "color 0.3s ease",
                      fontSize: "0.9rem",
                      animation: countdown <= 5 ? "pulseText 1s infinite" : "none",
                      "@keyframes pulseText": {
                        "0%": { opacity: 1 },
                        "50%": { opacity: 0.6 },
                        "100%": { opacity: 1 },
                      },
                    }}
                  >
                    {countdown}
                  </Typography>
                </Box>
              </Box>
              
              {/* Shield icon with animation */}
              <Box
                sx={{
                  position: "relative",
                  mb: 8,
                  mt: 5,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(97, 20, 99, 0.1) 0%, rgba(97, 20, 99, 0) 70%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "calc(100% + 20px)",
                      height: "calc(100% + 20px)",
                      borderRadius: "50%",
                      border: "2px dashed rgba(247, 147, 30, 0.3)",
                      animation: "spin 20s linear infinite",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    },
                  }}
                >
                  <ShieldIcon
                    sx={{
                      color: "#611463",
                      fontSize: 56,
                      filter: "drop-shadow(0 4px 8px rgba(97, 20, 99, 0.3))",
                      animation: "pulse 2s ease-in-out infinite alternate",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)", opacity: 0.9 },
                        "100%": { transform: "scale(1.05)", opacity: 1 },
                      },
                    }}
                  />
                  <LockIcon
                    sx={{
                      position: "absolute",
                      color: "#f7931e",
                      fontSize: 24,
                      filter: "drop-shadow(0 2px 4px rgba(247, 147, 30, 0.3))",
                      animation: "float 3s ease-in-out infinite",
                      "@keyframes float": {
                        "0%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(-5px)" },
                        "100%": { transform: "translateY(0)" },
                      },
                    }}
                  />
                </Box>
              </Box>
              
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  color: "#611463",
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", sm: "2.2rem" },
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  letterSpacing: "0.5px",
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40%",
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, #f7931e, transparent)",
                    borderRadius: "3px",
                  },
                }}
              >
                ການເຂົ້າເຖິງຖືກຈຳກັດ
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  my: 4,
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: { xs: "16px", sm: "18px" },
                  lineHeight: 1.7,
                  maxWidth: "92%",
                  mx: "auto",
                }}
              >
                ຂໍອະໄພ, ທ່ານຈຳເປັນຕ້ອງເຂົ້າສູ່ລະບົບເພື່ອເຂົ້າເຖິງໜ້ານີ້.
                <Box 
                  component="span" 
                  sx={{ 
                    display: "flex",
                    mt: 1.5, 
                    fontWeight: "500", 
                    color: countdown <= 5 ? "#f7931e" : "#611463",
                    transition: "color 0.5s ease",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <TimerIcon sx={{ 
                    fontSize: 20,
                    animation: countdown <= 5 ? "pulse 1s infinite" : "none",
                  }} />
                  ຖ້າບໍ່ເຂົົ້າສູ່ລະບົບທ່ານຈະກັບໄປຫາໜ້າຫຼັກໃນ {countdown} ວິນາທີ
                </Box>
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
                sx={{
                  background: "linear-gradient(45deg, #f7931e 0%, #ffb347 100%)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(45deg, #e07a0e 0%, #f7931e 100%)",
                    transform: "translateY(-3px) scale(1.03)",
                    boxShadow: "0 10px 25px rgba(247, 147, 30, 0.4), 0 0 0 2px rgba(247, 147, 30, 0.2)",
                  },
                  "&:active": {
                    transform: "translateY(-1px)",
                  },
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "12px 32px",
                  fontSize: "17px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  boxShadow: "0 7px 20px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(247, 147, 30, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transition: "all 0.6s ease",
                  },
                  "&:hover::before": {
                    left: "200%",
                  },
                }}
              >
                ເຂົ້າສູ່ລະບົບດຽວນີ້
              </Button>
              
              {/* Interactive light dots */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle at center, rgba(247, 147, 30, 0.2) 0%, rgba(247, 147, 30, 0.1) 30%, rgba(247, 147, 30, 0) 70%)",
                  borderRadius: "50%",
                  filter: "blur(10px)",
                  zIndex: -1,
                  opacity: hoverEffect ? 0.8 : 0.5,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  transform: hoverEffect ? "scale(1.2)" : "scale(1)",
                }}
              />
            </Paper>
          </Zoom>
        </Box>
      </Fade>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;