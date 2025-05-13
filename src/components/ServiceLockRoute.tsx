// src/components/ServiceLockRoute.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_LOCK } from '../../src/pages/serviceStatus/controllers/index';
import { Box, Typography, Modal, Button } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
// This HOC will wrap MainLayout to disable navigation during active services
const ServiceLockRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLockModal, setShowLockModal] = useState(false);
  const [attemptedPath, setAttemptedPath] = useState('');
  
  // Monitor location changes
  useEffect(() => {
    // If service is active and we're trying to navigate away from service status page
    if (SERVICE_LOCK.isActive) {
      const serviceStatusPath = `/serviceStatus/${SERVICE_LOCK.serviceId}`;
      const commentPath = `/comment/${SERVICE_LOCK.serviceId}`;
      
      // Allow navigation only to the service status page or comment page
      if (!location.pathname.includes(serviceStatusPath) && 
          !location.pathname.includes(commentPath)) {
        
        // Store the attempted path
        setAttemptedPath(location.pathname);
        
        // Show warning modal
        setShowLockModal(true);
        
        // Redirect back to service status page
        navigate(serviceStatusPath, { replace: true });
      }
    }
  }, [location, navigate]);
  
  // Intercept link clicks to handle them before navigation occurs
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // If service is active
      if (SERVICE_LOCK.isActive) {
        const target = e.target as HTMLElement;
        const link = target.closest('a, [role="button"], [onClick]');
        
        if (link) {
          // Check if this is a navigation element
          const isNavElement = link.classList.contains('menu-item') || 
                              link.closest('.menu-item') || 
                              link.getAttribute('href') ||
                              link.getAttribute('to');
          
          if (isNavElement) {
            // Find the path this link would navigate to
            const path = link.getAttribute('href') || 
                        link.getAttribute('to') || 
                        ''; // Default to empty string
            
            const serviceStatusPath = `/serviceStatus/${SERVICE_LOCK.serviceId}`;
            const commentPath = `/comment/${SERVICE_LOCK.serviceId}`;
            
            // If attempting to navigate away from service page
            if (!path.includes(serviceStatusPath) && !path.includes(commentPath)) {
              // Prevent default navigation
              e.preventDefault();
              e.stopPropagation();
              
              // Show warning modal
              setShowLockModal(true);
            }
          }
        }
      }
    };
    
    // Add listener to entire document to catch all clicks
    document.addEventListener('click', handleLinkClick, { capture: true });
    
    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);
  
  return (
    <>
      {children}
      
      {/* Lock warning modal */}
      <Modal
        open={showLockModal}
        onClose={() => setShowLockModal(false)}
        aria-labelledby="service-lock-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          < WarningRoundedIcon sx={{ fontSize: 48, color: '#611463', mb: 2 }} />
          <Typography id="service-lock-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
            ການບໍລິການກຳລັງດຳເນີນຢູ່
          </Typography>
          <Typography sx={{ mb: 3 }}>
            ທ່ານບໍ່ສາມາດໄປຍັງໜ້າອື່ນໄດ້ຈົນກວ່າການບໍລິການຈະສຳເລັດ. ກະລຸນາສຳເລັດການບໍລິການກ່ອນ.
          </Typography>
          <Button 
            variant="contained"
            onClick={() => setShowLockModal(false)}
            sx={{ 
              bgcolor: '#611463',
              '&:hover': { bgcolor: '#4a0d4c' }
            }}
          >
            ເຂົ້າໃຈແລ້ວ
          </Button>
        </Box>
      </Modal>
      
      {/* Floating lock indicator when service is active */}
      {SERVICE_LOCK.isActive && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            py: 1.5,
            px: 3,
            borderRadius: 10,
            bgcolor: 'rgba(97, 20, 99, 0.9)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          }}
        >
          < WarningRoundedIcon fontSize="small" />
          <Typography variant="body2" fontWeight={500}>
            ບໍ່ສາມາດໄປໜ້າອື່ນໄດ້ຈົນກວ່າຈະສໍາເລັດການບໍລິການ
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ServiceLockRoute;