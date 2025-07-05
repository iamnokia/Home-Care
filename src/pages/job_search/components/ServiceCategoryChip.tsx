import React from "react";
import { Chip } from "@mui/material";

const ServiceCategoryChip = ({ icon, title, isActive, onClick }) => {
  return (
    <Chip
      icon={icon}
      label={title}
      onClick={onClick}
      sx={{
        // Base styling - more compact to match card design
        px: { xs: 1.2, md: 1.5 },
        py: { xs: 1.5, md: 2 },
        borderRadius: '16px', // Smaller border radius for more subtle look
        backgroundColor: isActive
          ? 'rgba(97, 20, 99, 0.06)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        height: { xs: '36px', md: '40px' }, // Fixed height for consistency

        // Border styling - gradient border for active state
        position: 'relative',
        border: isActive ? 'none' : '1px solid rgba(238, 238, 238, 0.9)',
        '&::before': isActive ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '16px',
          padding: '1.5px',
          background: 'linear-gradient(45deg, #f7931e, #611463)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0,
        } : {},

        // Text styling - more subtle colors
        color: isActive ? '#611463' : '#666',

        // Shadow effects - lighter and more subtle
        boxShadow: isActive
          ? '0 4px 12px rgba(97, 20, 99, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)'
          : '0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.9)',

        // Icon styling - smaller and more refined
        '& .MuiChip-icon': {
          color: isActive ? '#f7931e' : '#611463',
          marginLeft: '8px',
          fontSize: { xs: '1.1rem', md: '1.2rem' }, // Smaller icon
          filter: isActive ? 'drop-shadow(0 1px 2px rgba(247, 147, 30, 0.2))' : 'none',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },

        // Label styling - more compact
        '& .MuiChip-label': {
          padding: { xs: '4px 8px', md: '6px 10px' },
          fontSize: { xs: '0.8rem', md: '0.85rem' }, // Smaller font
          letterSpacing: '0.01em',
          fontWeight: isActive ? 600 : 500,
          position: 'relative',
          zIndex: 1,
        },

        // Hover effects - more subtle
        '&:hover': {
          backgroundColor: isActive
            ? 'rgba(97, 20, 99, 0.1)'
            : 'rgba(97, 20, 99, 0.03)',
          boxShadow: '0 6px 16px rgba(97, 20, 99, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
          transform: 'translateY(-2px) scale(1.01)', // Smaller scale
          cursor: 'pointer',
          '& .MuiChip-icon': {
            transform: 'scale(1.1) rotate(-3deg)', // Smaller rotation
            color: isActive ? '#f7931e' : '#8E24AA',
          },
        },

        // Animation properties - smoother
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        m: { xs: 0.5, md: 0.8 }, // Smaller margins

        // Active state glow effect - more subtle
        '&::after': isActive ? {
          content: '""',
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          right: '-1px',
          bottom: '-1px',
          borderRadius: '17px',
          background: 'linear-gradient(45deg, rgba(247, 147, 30, 0.2), rgba(97, 20, 99, 0.2))',
          filter: 'blur(4px)',
          opacity: 0.3,
          zIndex: -1,
        } : {},

        // Focus states for accessibility
        '&:focus': {
          outline: 'none',
          boxShadow: isActive
            ? '0 4px 12px rgba(97, 20, 99, 0.15), 0 0 0 3px rgba(97, 20, 99, 0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 3px rgba(97, 20, 99, 0.1)',
        },

        // Responsive adjustments
        '@media (max-width: 600px)': {
          minWidth: 'auto',
          '& .MuiChip-label': {
            fontSize: '0.75rem',
            padding: '3px 6px',
          },
          '& .MuiChip-icon': {
            fontSize: '1rem',
            marginLeft: '6px',
          },
        },
      }}
    />
  );
};

export default ServiceCategoryChip;