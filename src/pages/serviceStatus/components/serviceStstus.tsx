import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  Fade,
  Grow,
  Avatar,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LockIcon from '@mui/icons-material/Lock';
import Homecare from '../../../assets/icons/HomeCareLogo.png';
import { useMainController } from '../controllers/index';
import { useParams } from 'react-router-dom';

interface ServiceStatusProps {
  orderId?: string;
}

const ServiceStatus: React.FC<ServiceStatusProps> = ({ orderId }) => {
  const [animate, setAnimate] = useState(false);
  const [showLockMessage, setShowLockMessage] = useState(false);
  const { id } = useParams();
  const actualOrderId = orderId || id;
  
  const {
    showStartButton,
    showCompleteButton,
    handleStartClick,
    handleCompleteClick,
    getStepStatus,
    isServiceActive
  } = useMainController(actualOrderId);

  // Show navigation lock message on component mount if service is active
  useEffect(() => {
    if (isServiceActive) {
      setShowLockMessage(true);
      // Hide message after 5 seconds
      const timer = setTimeout(() => {
        setShowLockMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isServiceActive]);

  // Animation on component mount
  useEffect(() => {
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
      color: '#00BFA6',
    },
    {
      id: 2,
      title: 'ກຳລັງດຳເນີນການ',
      description: 'ພະນັກງານກຳລັງດັງເນີນການ, ເມື່ອວຽກແລ້ວໆກະລຸນາກົດສຳເລັດດ້ວຍ.',
      icon: <TaskAltIcon sx={{ fontSize: 28 }} />,
      color: '#00BFA6',
    },
    {
      id: 3,
      title: 'ວຽກສຳເລັດແລ້ວ',
      description: 'ວຽກສຳເລັດແລ້ວຂໍຂອບໃຈທີ່ໃຊ້ບໍລິການຂອງເຮົາ',
      icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
      color: '#00BFA6',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #611463 0%, #611463 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 20%)',
          zIndex: 0,
        }
      }}
    >
     
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header Section with Logo and Title */}
        <Fade in={animate} timeout={800}>
          <Paper
            elevation={6}
            sx={{
              width: '100%',
              borderRadius: 6,
              p: { xs: 3, md: 4 },
              mb: 5,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              gap: { xs: 2, sm: 3 },
              border: '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'hidden',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(159, 122, 234, 0.1) 0%, rgba(159, 122, 234, 0) 70%)',
                borderRadius: '50%',
                transform: 'translate(30%, -30%)',
                zIndex: 0,
              }
            }}
          >
            {/* Logo */}
            <Avatar
              src={Homecare}
              alt="HomeCare Logo"
              sx={{ 
                width: { xs: 80, sm: 90, md: 100 }, 
                height: { xs: 80, sm: 90, md: 100 },
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                border: '4px solid rgba(255, 255, 255, 0.8)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            
            {/* Title */}
            <Box sx={{ 
              textAlign: { xs: 'center', sm: 'left' },
              position: 'relative',
              zIndex: 1,
            }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  color: '#611463',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                  mb: 1,
                  letterSpacing: '-0.02em',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40%',
                    height: 3,
                    borderRadius: 4,
                    background: 'linear-gradient(to right, #f7931e, transparent)',
                  }
                }}
              >
                ສະຖານະການບໍລິການ
              </Typography>
              <Typography 
                variant="subtitle1"
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  opacity: 0.9,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                ຕິດຕາມຄວາມຄືບໜ້າຂອງການບໍລິການຂອງທ່ານ
                {isServiceActive && (
                  <Box component="span" sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    color: '#00BFA6',
                    fontWeight: 'bold',
                    gap: 0.5
                  }}>
                    <LockIcon fontSize="small" /> ກຳລັງດຳເນີນ
                  </Box>
                )}
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
          {/* Suggestion Text Before Start Button */}
          {showStartButton && (
            <Grow in={animate} timeout={500}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 3,
                  mx: { xs: 0, sm: 2, md: 3 },
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 191, 166, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    background: 'linear-gradient(to bottom, #00BFA6, #38B2AC)',
                    borderRadius: '4px 0 0 4px',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccessTimeIcon sx={{ color: '#00BFA6', fontSize: 28 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: '#611463',
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                      lineHeight: 1.6
                    }}
                  >
                    ກະລຸນາລໍຖ້າພະນັກງານກຳລັງເດີນທາງ, ເມື່ອພະນັກງານມາຮອດແລ້ວ, ກະລຸນາກົດເລີ່ມຕົ້ນດ້ວຍ.
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          )}
          
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
                  elevation={4}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.5, sm: 1.8 },
                    borderRadius: 10,
                    background: 'linear-gradient(90deg, #00BFA6 0%, #38B2AC 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    transform: 'translateX(-20px)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 10px 20px rgba(0, 191, 166, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                      boxShadow: '0 15px 25px rgba(0, 191, 166, 0.4)',
                      transform: 'translateX(-20px) translateY(-5px)',
                    },
                    '&:active': {
                      transform: 'translateX(-20px) translateY(-2px)',
                    }
                  }}
                  onClick={handleStartClick}
                >
                  <FlagIcon fontSize="small" />
                  <Typography 
                    variant="button" 
                    sx={{ 
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      letterSpacing: '0.5px',
                      fontWeight: 600
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
              width: 4,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
              borderRadius: 4,
              zIndex: 0,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: -3,
                top: 0,
                bottom: 0,
                width: 10,
                background: 'linear-gradient(to bottom, rgba(107, 70, 193, 0.1) 0%, rgba(107, 70, 193, 0) 100%)',
                filter: 'blur(3px)',
                borderRadius: 4,
                zIndex: -1,
              }
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
                  mb: 6, 
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {/* Step Icon */}
                  <Avatar
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      backgroundColor: status === 'completed' || status === 'current' ? '#00BFA6' : 'white',
                      color: status === 'completed' || status === 'current' ? 'white' : '#00BFA6',
                      boxShadow: status === 'current' ? 
                        '0 8px 20px rgba(0, 191, 166, 0.4), 0 0 0 8px rgba(0, 191, 166, 0.1)' : 
                        '0 8px 16px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      ml: { xs: 0, sm: 1.5, md: 3.5 },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: status === 'current' ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
                    }}
                  >
                    {step.icon}
                  </Avatar>

                  {/* Step Content */}
                  <Paper
                    elevation={5}
                    sx={{
                      ml: { xs: -2, sm: -2.5 },
                      py: { xs: 2.5, sm: 2.8, md: 3.2 },
                      px: { xs: 3, sm: 4, md: 5 },
                      pl: { xs: 4, sm: 5, md: 6 },
                      borderRadius: { xs: '0 20px 20px 0', sm: '0 24px 24px 0' },
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: status === 'current' ? 
                        '0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 191, 166, 0.3)' : 
                        '0 10px 20px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      '&:hover': {
                        transform: status === 'pending' ? 'translateY(-2px)' : 'translateY(-5px)',
                        boxShadow: status === 'current' ? 
                          '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 191, 166, 0.4)' : 
                          '0 15px 30px rgba(0, 0, 0, 0.12)',
                      },
                      border: status === 'current' ? '1px solid rgba(0, 191, 166, 0.3)' : 'none',
                      opacity: status === 'pending' ? 0.75 : 1,
                      overflow: 'hidden',
                      '&::after': status === 'current' ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 4,
                        background: 'linear-gradient(to bottom, #00BFA6, #38B2AC)',
                        borderRadius: '4px 0 0 4px',
                      } : {},
                      '&::before': status === 'completed' ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '80px',
                        height: '80px',
                        background: 'radial-gradient(circle, rgba(0, 191, 166, 0.08) 0%, rgba(0, 191, 166, 0) 70%)',
                        borderRadius: '50%',
                        transform: 'translate(30%, -30%)',
                        zIndex: 0,
                      } : {},
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: status === 'pending' ? '#9e9e9e' : '#611463',
                        fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.3rem' },
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                      {status === 'completed' && (
                        <CheckCircleIcon 
                          sx={{ 
                            ml: 1, 
                            fontSize: '1.1rem', 
                            color: '#00BFA6',
                            verticalAlign: 'middle'
                          }} 
                        />
                      )}
                    </Typography>
                    
                    <Divider sx={{ mb: 1.8, opacity: 0.6 }} />
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                        lineHeight: 1.7,
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
                  elevation={4}
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.5, sm: 1.8 },
                    borderRadius: 10,
                    background: 'linear-gradient(90deg, #00BFA6 0%, #38B2AC 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    transform: 'translateX(-20px)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 10px 20px rgba(0, 191, 166, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                      boxShadow: '0 15px 25px rgba(0, 191, 166, 0.4)',
                      transform: 'translateX(-20px) translateY(-5px)',
                    },
                    '&:active': {
                      transform: 'translateX(-20px) translateY(-2px)',
                    }
                  }}
                  onClick={handleCompleteClick}
                >
                  <CheckCircleIcon fontSize="small" />
                  <Typography
                    variant="button"
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      letterSpacing: '0.5px',
                      fontWeight: 600
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
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      backgroundColor: status === 'completed' || status === 'current' ? '#00BFA6' : 'white',
                      color: status === 'completed' || status === 'current' ? 'white' : '#00BFA6',
                      boxShadow: status === 'current' ? 
                        '0 8px 20px rgba(0, 191, 166, 0.4), 0 0 0 8px rgba(0, 191, 166, 0.1)' : 
                        '0 8px 16px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      ml: { xs: 0, sm: 1.5, md: 3.5 },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: status === 'current' ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
                    }}
                  >
                    {step.icon}
                  </Avatar>

                  {/* Step Content */}
                  <Paper
                    elevation={5}
                    sx={{
                      ml: { xs: -2, sm: -2.5 },
                      py: { xs: 2.5, sm: 2.8, md: 3.2 },
                      px: { xs: 3, sm: 4, md: 5 },
                      pl: { xs: 4, sm: 5, md: 6 },
                      borderRadius: { xs: '0 20px 20px 0', sm: '0 24px 24px 0' },
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: status === 'current' ? 
                        '0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 191, 166, 0.3)' : 
                        '0 10px 20px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      '&:hover': {
                        transform: status === 'pending' ? 'translateY(-2px)' : 'translateY(-5px)',
                        boxShadow: status === 'current' ? 
                          '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 191, 166, 0.4)' : 
                          '0 15px 30px rgba(0, 0, 0, 0.12)',
                      },
                      border: status === 'current' ? '1px solid rgba(0, 191, 166, 0.3)' : 'none',
                      opacity: status === 'pending' ? 0.75 : 1,
                      overflow: 'hidden',
                      '&::after': status === 'current' ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 4,
                        background: 'linear-gradient(to bottom, #00BFA6, #38B2AC)',
                        borderRadius: '4px 0 0 4px',
                      } : {},
                      '&::before': status === 'completed' ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '80px',
                        height: '80px',
                        background: 'radial-gradient(circle, rgba(0, 191, 166, 0.08) 0%, rgba(0, 191, 166, 0) 70%)',
                        borderRadius: '50%',
                        transform: 'translate(30%, -30%)',
                        zIndex: 0,
                      } : {},
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: status === 'pending' ? '#9e9e9e' : '#611463',
                        fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.3rem' },
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                      {status === 'completed' && (
                        <CheckCircleIcon 
                          sx={{ 
                            ml: 1, 
                            fontSize: '1.1rem', 
                            color: '#611463',
                            verticalAlign: 'middle'
                          }} 
                        />
                      )}
                    </Typography>
                    
                    <Divider sx={{ mb: 1.8, opacity: 0.6 }} />
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                        lineHeight: 1.7,
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

          {/* Permanent lock indicator when service is active */}
          {isServiceActive && (
            <Paper
              elevation={3}
              sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                py: 1.5,
                px: 3,
                borderRadius: 10,
                background: 'rgba(97, 20, 99, 0.9)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                zIndex: 1000,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceStatus;