// ServiceStyles.jsx - Centralized styles for the Services components

export const styles = {
    // Main container styles
    mainContainer: {
      minHeight: "auto",
      py: 7,
      px: { xs: 2, md: 4 },
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }
    },
    
    // Floating decorative element
    floatingDecorativeElement: {
      position: "absolute",
      width: 400,
      height: 400,
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(97, 20, 99, 0.03) 0%, rgba(153, 50, 204, 0.03) 100%)",
      top: -200,
      right: -200,
      filter: "blur(80px)",
      animation: "float 15s ease-in-out infinite alternate",
      "@keyframes float": {
        "0%": { transform: "translateY(0) rotate(0deg)" },
        "100%": { transform: "translateY(20px) rotate(5deg)" }
      }
    },
  
    // Categories section styles
    categoriesSection: {
      mb: 6,
      position: "relative",
      zIndex: 1
    },
  
    // Decorative dots container
    decorativeDotsContainer: {
      position: "absolute",
      top: -35,
      left: "50%",
      transform: "translateX(-50%)",
      width: 100,
      height: 10,
      display: "flex",
      justifyContent: "space-between"
    },
  
    // Individual decorative dot
    decorativeDot: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #611463 0%, #9932CC 100%)",
      opacity: 0.7,
      animation: "pulse 3s ease-in-out infinite",
      "@keyframes pulse": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.1)" },
        "100%": { transform: "scale(1)" }
      }
    },
  
    // Section title
    sectionTitle: {
      mb: 3.5,
      fontWeight: 'bold',
      background: "linear-gradient(135deg, #611463 30%, #9932CC 90%)",
      backgroundSize: "200% 200%",
      backgroundClip: "text",
      textFillColor: "transparent",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: { xs: "2.2rem", md: "2.8rem" },
      letterSpacing: "-0.5px",
      position: "relative",
      animation: "shimmer 6s ease-in-out infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "0% 0%" },
        "50%": { backgroundPosition: "100% 100%" },
        "100%": { backgroundPosition: "0% 0%" }
      },
      textShadow: "0 10px 20px rgba(97, 20, 99, 0.1)",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: -15,
        left: "50%",
        transform: "translateX(-50%)",
        width: 120,
        height: 2,
        background: "linear-gradient(90deg, transparent 0%, #9932CC 50%, transparent 100%)"
      }
    },
  
    // Categories container
    categoriesContainer: {
      p: { xs: 2.5, md: 3.5 },
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      mx: 'auto',
      maxWidth: 900,
      border: 'none',
      borderRadius: '16px',
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 15px 35px rgba(97, 20, 99, 0.07), 0 5px 15px rgba(0, 0, 0, 0.03)',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        padding: '2px',
        background: 'linear-gradient(135deg, #611463, #f7931e, #9932CC, #611463)',
        backgroundSize: '300% 300%',
        animation: 'gradientBorder 8s ease infinite',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: 0.8,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: -10,
        right: -10,
        width: 80,
        height: 80,
        borderRadius: '0 16px 0 80px',
        background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.12), rgba(247, 147, 30, 0.08))',
        filter: 'blur(10px)',
        zIndex: -1,
      }
    },
  
    // Divider
    divider: {
      borderBottom: '1px solid #e0e0e0',
      width: '100%',
      my: 4
    },
  
    // Services section
    servicesSection: {
      mb: 6,
      position: 'relative',
      perspective: '1000px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.6), rgba(97, 20, 99, 0))',
        borderRadius: '50%',
        filter: 'blur(15px)',
        top: '-20px',
        left: '5%',
        animation: 'floatElement 6s ease-in-out infinite alternate',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.4), rgba(247, 147, 30, 0))',
        borderRadius: '50%',
        filter: 'blur(20px)',
        bottom: '-30px',
        right: '8%',
        animation: 'floatElement 8s ease-in-out infinite alternate-reverse',
        zIndex: 0,
      },
      '@keyframes floatElement': {
        '0%': { transform: 'translateY(0px) rotate(0deg)' },
        '100%': { transform: 'translateY(20px) rotate(10deg)' },
      },
      '@keyframes glowPulse': {
        '0%': { opacity: 0.7 },
        '50%': { opacity: 0.3 },
        '100%': { opacity: 0.7 },
      },
      '@keyframes rotateGradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      }
    },
  
    // Filter results container
    filterResultsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 4,
      position: 'relative',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      p: { xs: 2.5, md: 3 },
      transform: 'rotateX(2deg)',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 10px 25px rgba(97, 20, 99, 0.08), 0 2px 10px rgba(247, 147, 30, 0.05)',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23611463\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.5,
        zIndex: -1,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #611463, #f7931e, #9932CC)',
        borderRadius: '16px 16px 0 0',
        zIndex: 2,
      }
    },
  
    // Filter title container
    filterTitleContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
  
    // Icon container
    iconContainer: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      mr: 2,
      background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.1), rgba(97, 20, 99, 0.03))',
      boxShadow: '0 4px 8px rgba(97, 20, 99, 0.05)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, rgba(97, 20, 99, 0.3), rgba(247, 147, 30, 0.3))',
        borderRadius: '50%',
        filter: 'blur(20px)',
        animation: 'glowPulse 3s infinite ease-in-out',
        opacity: 0.5,
      }
    },
  
    // Filter title
    filterTitle: {
      fontWeight: 'bold',
      position: 'relative',
      color: '#611463',
      textShadow: '0 2px 10px rgba(97, 20, 99, 0.1)',
      letterSpacing: '0.5px',
      background: 'linear-gradient(90deg, #611463, #9932CC)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -5,
        left: 0,
        width: '60%',
        height: 3,
        borderRadius: 4,
        background: 'linear-gradient(90deg, #611463, rgba(247, 147, 30, 0.5))',
        transition: 'all 0.5s ease',
      }
    },
  
    // Show all button
    showAllButton: {
      background: 'rgba(97, 20, 99, 0.04)',
      color: '#611463',
      borderRadius: '30px',
      px: 3,
      py: 1,
      fontWeight: 600,
      boxShadow: 'none',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      border: '1px solid rgba(97, 20, 99, 0.1)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #611463, #9932CC)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 0,
      },
      '& .MuiButton-startIcon': {
        marginRight: '8px',
        position: 'relative',
        zIndex: 1,
      },
      '& .MuiButton-label': {
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s ease',
      },
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 20px rgba(97, 20, 99, 0.15)',
        '&::before': {
          opacity: 1,
        },
        color: 'white',
      }
    }
  };