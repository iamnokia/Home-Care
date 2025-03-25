import React from "react";
import { Chip } from "@mui/material";

const ServiceCategoryChip = ({ icon, title, isActive, onClick }) => {
  return (
    <Chip
      icon={icon}
      label={title}
      onClick={onClick}
      sx={{
        // Base styling
        px: { xs: 1.8, md: 2.2 },
        py: { xs: 3, md: 3.5 },
        borderRadius: '24px',
        backgroundColor: isActive
          ? 'rgba(97, 20, 99, 0.04)'
          : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',

        // Border styling - gradient border for active state
        position: 'relative',
        border: isActive ? 'none' : '1px solid rgba(238, 238, 238, 0.8)',
        '&::before': isActive ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '24px',
          padding: '2px',
          background: 'linear-gradient(45deg, #f7931e, #e44d26, #611463)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0,
        } : {},

        // Text styling
        color: isActive ? '#5D1277' : '#555',

        // Shadow effects
        boxShadow: isActive
          ? '0 8px 20px rgba(97, 20, 99, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
          : '0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',

        // Icon styling
        '& .MuiChip-icon': {
          color: isActive ? '#f7931e' : '#611463',
          marginLeft: '10px',
          fontSize: '1.5rem',
          filter: isActive ? 'drop-shadow(0 2px 3px rgba(247, 147, 30, 0.3))' : 'none',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },

        // Label styling
        '& .MuiChip-label': {
          padding: '8px 14px',
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          fontWeight: isActive ? 600 : 400,
          position: 'relative',
          zIndex: 1,
        },

        // Hover effects
        '&:hover': {
          backgroundColor: isActive
            ? 'rgba(97, 20, 99, 0.08)'
            : 'rgba(97, 20, 99, 0.02)',
          boxShadow: '0 10px 25px rgba(97, 20, 99, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          transform: 'translateY(-3px) scale(1.02)',
          cursor: 'pointer',
          '& .MuiChip-icon': {
            transform: 'scale(1.15) rotate(-5deg)',
            color: isActive ? '#f7931e' : '#8E24AA',
          },
        },

        // Animation properties
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        height: 'auto',
        m: 1,

        // Active state special glow effect
        '&::after': isActive ? {
          content: '""',
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          borderRadius: '26px',
          background: 'linear-gradient(45deg, rgba(247, 147, 30, 0.4), rgba(97, 20, 99, 0.4))',
          filter: 'blur(8px)',
          opacity: 0.4,
          zIndex: -1,
        } : {},
      }}
    />
  );
};

export default ServiceCategoryChip;