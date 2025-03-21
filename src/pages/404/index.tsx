import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";
import "./404.css";
import LOGO_HOMECARE from "../../assets/icons/HomeCareLogo.png";

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        duration: 0.8
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Decorative gradient background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "30vh",
          background: "linear-gradient(45deg, #611463 30%, #f7931e 90%)",
          borderRadius: "0 0 50% 50% / 0 0 100px 100px",
          transform: "scaleX(1.5)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          zIndex: 0
        }}
      />

      {/* Floating elements */}
      <Box sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }}>
        {[...Array(15)].map((_, i) => (
          <Box
            component={motion.div}
            key={i}
            sx={{
              position: "absolute",
              borderRadius: "50%",
              background: i % 2 === 0 
                ? "linear-gradient(135deg, rgba(97, 20, 99, 0.2), rgba(97, 20, 99, 0.1))" 
                : "linear-gradient(135deg, rgba(247, 147, 30, 0.2), rgba(247, 147, 30, 0.1))",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 1
            }}
            animate={{
              y: [0, Math.random() * 60 - 30],
              x: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </Box>

      {/* Main content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 20px 30px rgba(0,0,0,0.15)"
            },
            position: "relative"
          }}
        >
          {/* Header with logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 2, md: 3 },
              bgcolor: "#fff"
            }}
          >
            <img
              src={LOGO_HOMECARE}
              alt="HomeCare Logo"
              style={{
                maxWidth: isMobile ? "80px" : "100px",
                filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.2))"
              }}
            />
          </Box>

          {/* 404 content */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
              p: { xs: 4, md: 6 },
              textAlign: "center"
            }}
          >
            <motion.div variants={numberVariants}>
              <Typography
                className="gradient-number"
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "7rem", sm: "10rem", md: "12rem" },
                  lineHeight: 1,
                  background: "linear-gradient(45deg, #611463 30%, #f7931e 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  mb: 2
                }}
              >
                404
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  mb: 2,
                  fontSize: { xs: "1.5rem", sm: "2rem" }
                }}
              >
                Page Not Found
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 4,
                  maxWidth: "500px",
                  mx: "auto"
                }}
              >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </Typography>
            </motion.div>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  href="/"
                  sx={{
                    py: 1.5,
                    px: 3,
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
                  Go Home
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => window.history.back()}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    borderColor: "#611463",
                    color: "#611463",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#f7931e",
                      color: "#f7931e",
                      background: "rgba(247, 147, 30, 0.05)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 10px rgba(247, 147, 30, 0.15)"
                    }
                  }}
                >
                  Go Back
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;