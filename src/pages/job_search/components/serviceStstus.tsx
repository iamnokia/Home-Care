import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Avatar,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Homecare from '../../../assets/icons/HomeCareLogo.png';
import { useNavigate } from 'react-router-dom';
import { COMMENT_PATH } from '../../../routes/path';

const ServiceStatus = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Animation states
  const [animate, setAnimate] = useState(false);
  
  // Step status tracking
  const [currentStepId, setCurrentStepId] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  // Step data with icons
  const steps = [
    {
      id: 1,
      title: 'ພະນັກງານຮອດແລ້ວ',
      description: 'ພະນັກງານຮອດເຮືອນຂອງທ່ານແລ້ວ',
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      color: '#8bc34a',
    },
    {
      id: 2,
      title: 'ກຳລັງດຳເນີນການ',
      description: 'ພະນັກງານກຳລັງຢູ່ເສັ້ນທາງ, ພະນັກງານກຳລັງດັງເນີນການ, ເມື່ອວຽກແລ້ວໆກະລຸນາກົດສຳເລັດດ້ວຍ.',
      icon: <TaskAltIcon sx={{ fontSize: 28 }} />,
      color: '#8bc34a',
    },
    {
      id: 3,
      title: 'ວຽກສຳເລັດແລ້ວ',
      description: 'ວຽກສຳເລັດແລ້ວຂໍຂອບໃຈທີ່ໃຊ້ບໍລິການຂອງເຮົາ',
      icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
      color: '#8bc34a',
    },
  ];

  // Get status for each step
  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) {
      return 'completed';
    }
    if (currentStepId === stepId) {
      return 'current';
    }
    return 'pending';
  };

  // Handle start button click
  const handleStartClick = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowStartButton(false);
    setCurrentStepId(1);
    
    // After 5 seconds, advance to step 2
    setTimeout(() => {
      setCompletedSteps([1]);
      setCurrentStepId(2);
      setShowCompleteButton(true);
      setIsProcessing(false);
    }, 5000);
  };

  // Handle complete button click
  const handleCompleteClick = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowCompleteButton(false);
    setCompletedSteps([1, 2]);
    setCurrentStepId(3);
    
    // After 5 seconds, navigate to comment page
    setTimeout(() => {
      navigate(COMMENT_PATH);
    }, 3000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #611463 0%, #7b1890 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Header Section with Logo and Title */}
        <Fade in={animate} timeout={800}>
          <Paper
            elevation={4}
            sx={{
              width: '100%',
              borderRadius: 4,
              p: { xs: 3, md: 4 },
              mb: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {/* Logo */}
            <Avatar
              src={Homecare}
              alt="HomeCare Logo"
              sx={{ 
                width: { xs: 80, sm: 90, md: 100 }, 
                height: { xs: 80, sm: 90, md: 100 },
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            />
            
            {/* Title */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  color: '#611463',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                  mb: 1,
                }}
              >
                ສະຖານະການບໍລິການ
              </Typography>
              <Typography 
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
              >
                ຕິດຕາມຄວາມຄືບໜ້າຂອງການບໍລິການຂອງທ່ານ
              </Typography>
            </Box>
          </Paper>
        </Fade>

        {/* Process Timeline */}
        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          mt: 2,
          px: { xs: 0, sm: 2, md: 3 },
        }}>
          {/* Start Button */}
          {showStartButton && (
            <Grow in={animate} timeout={600}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 4,
                  ml: { xs: 5, sm: 8, md: 12 },
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #8bc34a 0%, #7cb342 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    transform: 'translateX(-20px)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 4px 12px rgba(139, 195, 74, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(139, 195, 74, 0.4)',
                      transform: 'translateX(-20px) translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateX(-20px) translateY(0px)',
                    }
                  }}
                  onClick={handleStartClick}
                >
                  <FlagIcon fontSize="small" />
                  <Typography 
                    variant="button" 
                    sx={{ 
                      textTransform: 'none',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' }
                    }}
                  >
                    ເລີ່ມຕົ້ນ
                  </Typography>
                </Paper>
              </Box>
            </Grow>
          )}

          {/* Vertical Timeline Line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 22, sm: 40, md: 60 },
              top: 0,
              bottom: 30,
              width: 3,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
              borderRadius: 4,
              zIndex: 0,
            }}
          />

          {/* First Two Timeline Steps */}
          {steps.slice(0, 2).map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <Grow 
                key={step.id} 
                in={animate} 
                timeout={800 + (index * 300)}
                style={{ transformOrigin: 'left center' }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  mb: 5, 
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {/* Step Icon */}
                  <Avatar
                    sx={{
                      width: { xs: 44, sm: 50 },
                      height: { xs: 44, sm: 50 },
                      backgroundColor: status === 'completed' || status === 'current' ? '#8bc34a' : 'white',
                      color: status === 'completed' || status === 'current' ? 'white' : '#8bc34a',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      ml: { xs: 0, sm: 1.5, md: 3.5 },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {step.icon}
                  </Avatar>

                  {/* Step Content */}
                  <Paper
                    elevation={4}
                    sx={{
                      ml: { xs: -2, sm: -2.5 },
                      py: { xs: 2, sm: 2.5, md: 3 },
                      px: { xs: 3, sm: 4, md: 5 },
                      pl: { xs: 4, sm: 5, md: 6 },
                      borderRadius: { xs: '0 16px 16px 0', sm: '0 20px 20px 0' },
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      },
                      border: status === 'current' ? '2px solid #8bc34a' : 'none',
                      opacity: status === 'pending' ? 0.7 : 1,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: status === 'pending' ? '#9e9e9e' : '#611463',
                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.title}
                      {status === 'completed' && (
                        <CheckCircleIcon 
                          sx={{ 
                            ml: 1, 
                            fontSize: '1rem', 
                            color: '#8bc34a',
                            verticalAlign: 'middle'
                          }} 
                        />
                      )}
                    </Typography>
                    
                    <Divider sx={{ mb: 1.5, opacity: 0.6 }} />
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                        lineHeight: 1.6,
                        color: status === 'pending' ? '#9e9e9e' : 'text.secondary',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Paper>
                </Box>
              </Grow>
            );
          })}

          {/* Complete Button - Shown when step 2 is active */}
          {showCompleteButton && (
            <Grow in={true} timeout={600}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 5,
                  ml: { xs: 5, sm: 8, md: 12 },
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #8bc34a 0%, #7cb342 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    transform: 'translateX(-20px)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 4px 12px rgba(139, 195, 74, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(139, 195, 74, 0.4)',
                      transform: 'translateX(-20px) translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateX(-20px) translateY(0px)',
                    }
                  }}
                  onClick={handleCompleteClick}
                >
                  <CheckCircleIcon fontSize="small" />
                  <Typography
                    variant="button"
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' }
                    }}
                  >
                    ສໍາເລັດ
                  </Typography>
                </Paper>
              </Box>
            </Grow>
          )}

          {/* Last Timeline Step */}
          {(() => {
            const step = steps[2];
            const status = getStepStatus(step.id);
            return (
              <Grow 
                key={step.id} 
                in={animate} 
                timeout={1400}
                style={{ transformOrigin: 'left center' }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  mb: 5, 
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {/* Step Icon */}
                  <Avatar
                    sx={{
                      width: { xs: 44, sm: 50 },
                      height: { xs: 44, sm: 50 },
                      backgroundColor: status === 'completed' || status === 'current' ? '#8bc34a' : 'white',
                      color: status === 'completed' || status === 'current' ? 'white' : '#8bc34a',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      ml: { xs: 0, sm: 1.5, md: 3.5 },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {step.icon}
                  </Avatar>

                  {/* Step Content */}
                  <Paper
                    elevation={4}
                    sx={{
                      ml: { xs: -2, sm: -2.5 },
                      py: { xs: 2, sm: 2.5, md: 3 },
                      px: { xs: 3, sm: 4, md: 5 },
                      pl: { xs: 4, sm: 5, md: 6 },
                      borderRadius: { xs: '0 16px 16px 0', sm: '0 20px 20px 0' },
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      },
                      border: status === 'current' ? '2px solid #8bc34a' : 'none',
                      opacity: status === 'pending' ? 0.7 : 1,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: status === 'pending' ? '#9e9e9e' : '#611463',
                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.title}
                      {status === 'completed' && (
                        <CheckCircleIcon 
                          sx={{ 
                            ml: 1, 
                            fontSize: '1rem', 
                            color: '#8bc34a',
                            verticalAlign: 'middle'
                          }} 
                        />
                      )}
                    </Typography>
                    
                    <Divider sx={{ mb: 1.5, opacity: 0.6 }} />
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                        lineHeight: 1.6,
                        color: status === 'pending' ? '#9e9e9e' : 'text.secondary',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Paper>
                </Box>
              </Grow>
            );
          })()}
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceStatus;