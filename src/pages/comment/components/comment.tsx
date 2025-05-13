import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
  TextField,
  useTheme,
  useMediaQuery,
  Rating,
  CircularProgress,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import useCommentController from "../controllers/index";

// Font size constants
const fontSize = {
  title: "1.6rem",
  subtitle: "1.1rem",
  text: "0.95rem",
  button: "1rem",
};

const CommentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showLockMessage, setShowLockMessage] = useState(true);

  // Get everything from the controller
  const {
    serviceDetails,
    billingData,
    loading,
    error,
    rating,
    comment,
    commentError,
    alertOpen,
    alertMessage,
    alertSeverity,
    setRating,
    handleCommentChange,
    handleAlertClose,
    handleCommentSubmit,
    handleDownloadReceipt
  } = useCommentController();

  // Navigation lock effect - production safe implementation
  useEffect(() => {
    // Handle navigation attempts
    const handleNavigation = (e) => {
      const target = e.target;
      
      // Skip if click is on submit button or download button
      if (target.closest('[data-comment-submit="true"]') || 
          target.closest('[data-download-receipt="true"]')) {
        return;
      }
      
      // Check if this is a navigation element
      const isNavElement = 
        target.closest('a') ||
        target.closest('button:not([data-comment-submit="true"]):not([data-download-receipt="true"])') ||
        target.closest('.menu-item') ||
        target.closest('[role="button"]') ||
        target.closest('[onClick]') ||
        (target.tagName === 'A');
      
      if (isNavElement) {
        // Prevent navigation
        e.preventDefault();
        e.stopPropagation();
        
        // Show warning
        window.alert('ກະລຸນາສົ່ງຄຳເຫັນຂອງທ່ານກ່ອນນຳທາງໄປໜ້າອື່ນ');
        return false;
      }
    };

    // Handle browser back button
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      window.alert('ກະລຸນາສົ່ງຄຳເຫັນຂອງທ່ານກ່ອນນຳທາງໄປໜ້າອື່ນ');
    };

    // Set initial history state to enable popstate detection
    window.history.pushState(null, "", window.location.href);
    
    // Add event listeners
    document.addEventListener('click', handleNavigation, true);
    window.addEventListener('popstate', handlePopState);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleNavigation, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Modify the handleCommentSubmit to also disable the lock when navigating
  const handleSubmitComment = () => {
    setShowLockMessage(false); // Hide the lock message
    handleCommentSubmit(); // Call the original handler
  };

  // Generate and download receipt as PNG
  const handleDownloadPDF = () => {
    // Your existing receipt download code...
    // [Keep your current implementation]
    
    // Create a beautiful bill receipt element
    const createBillElement = () => {
      const billContainer = document.createElement('div');
      billContainer.style.width = '650px';
      billContainer.style.backgroundColor = 'white';
      billContainer.style.fontFamily = 'Arial, sans-serif';
      billContainer.style.boxSizing = 'border-box';
      billContainer.style.position = 'fixed';
      billContainer.style.left = '-9999px';
      billContainer.style.boxShadow = '0 0 40px rgba(0,0,0,0.15)';
      billContainer.style.borderRadius = '16px';
      billContainer.style.overflow = 'hidden';

      // Add header with gradient background
      const header = document.createElement('div');
      header.style.backgroundColor = '#611463';
      header.style.background = 'linear-gradient(135deg, #611463 0%, #8E24AA 100%)';
      header.style.color = 'white';
      header.style.padding = '25px 40px';
      header.style.textAlign = 'center';
      header.style.position = 'relative';

      // Header content
      const logo = document.createElement('div');
      logo.style.fontSize = '32px';
      logo.style.fontWeight = 'bold';
      logo.style.marginBottom = '5px';
      logo.style.letterSpacing = '1px';
      logo.textContent = 'HomeCare';

      const tagline = document.createElement('div');
      tagline.style.fontSize = '14px';
      tagline.style.opacity = '0.9';
      tagline.textContent = 'ໂຮມແຄຣ໌ ດູແລບ້ານ';

      header.appendChild(logo);
      header.appendChild(tagline);

      // Receipt title with decorative element
      const receiptTitle = document.createElement('div');
      receiptTitle.style.position = 'relative';
      receiptTitle.style.margin = '0 auto';
      receiptTitle.style.width = '120px';
      receiptTitle.style.height = '40px';
      receiptTitle.style.backgroundColor = 'white';
      receiptTitle.style.color = '#611463';
      receiptTitle.style.fontWeight = 'bold';
      receiptTitle.style.fontSize = '20px';
      receiptTitle.style.display = 'flex';
      receiptTitle.style.justifyContent = 'center';
      receiptTitle.style.alignItems = 'center';
      receiptTitle.style.borderRadius = '20px';
      receiptTitle.style.marginTop = '15px';
      receiptTitle.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      receiptTitle.textContent = 'ໃບບິນ';

      header.appendChild(receiptTitle);
      billContainer.appendChild(header);

      // Main content section
      const content = document.createElement('div');
      content.style.padding = '40px';

      // Add receipt number and date
      const receiptMeta = document.createElement('div');
      receiptMeta.style.display = 'flex';
      receiptMeta.style.justifyContent = 'space-between';
      receiptMeta.style.marginBottom = '30px';
      receiptMeta.style.color = '#666';
      receiptMeta.style.fontSize = '14px';

      const receiptNumber = document.createElement('div');
      receiptNumber.innerHTML = '<span style="font-weight:bold;">Receipt No:</span> ' + (billingData.receiptNo || `HC-${Math.floor(10000 + Math.random() * 90000)}`);

      const receiptDate = document.createElement('div');
      receiptDate.innerHTML = '<span style="font-weight:bold;">Date:</span> ' + (billingData.orderDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));

      receiptMeta.appendChild(receiptNumber);
      receiptMeta.appendChild(receiptDate);
      content.appendChild(receiptMeta);

      // Create customer info section with card-like styling
      const customerCard = document.createElement('div');
      customerCard.style.backgroundColor = '#f9f5fc';
      customerCard.style.borderRadius = '12px';
      customerCard.style.padding = '20px';
      customerCard.style.marginBottom = '30px';
      customerCard.style.border = '1px solid #e9dbf5';

      const customerTitle = document.createElement('div');
      customerTitle.style.fontWeight = 'bold';
      customerTitle.style.fontSize = '16px';
      customerTitle.style.marginBottom = '12px';
      customerTitle.style.color = '#611463';
      customerTitle.style.display = 'flex';
      customerTitle.style.alignItems = 'center';
      customerTitle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#611463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ຂໍ້ມູນຜູ້ໃຫ້ບໍລິການ';

      customerCard.appendChild(customerTitle);

      // Get service details for the first item
      const service = serviceDetails.length > 0 ? serviceDetails[0] : null;

      const customerName = document.createElement('div');
      customerName.style.fontWeight = 'bold';
      customerName.style.fontSize = '18px';
      customerName.style.marginBottom = '5px';
      customerName.textContent = service ? `${service.firstName} ${service.surname}` : billingData.customerName;

      const customerDetails = document.createElement('div');
      customerDetails.style.fontSize = '14px';
      customerDetails.style.color = '#666';
      customerDetails.textContent = service ? `${service.gender}, ${service.age}ປີ ${service.village} ${service.city}` : 'ອາຍຸ, 21ປີ ບ້ານ ໂນນສະຫວ່າງ ເມືອງ ໄຊເສດຖາ';

      customerCard.appendChild(customerName);
      customerCard.appendChild(customerDetails);
      content.appendChild(customerCard);

      // Rest of your receipt code...
      // [Keep all your existing receipt code]

      return billContainer;
    };

    // Create and add element to DOM
    const billElement = createBillElement();
    document.body.appendChild(billElement);

    // Use html2canvas to convert to image
    import('html2canvas').then(html2canvasModule => {
      const html2canvas = html2canvasModule.default;

      html2canvas(billElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      }).then(canvas => {
        // Convert to PNG
        const imgData = canvas.toDataURL('image/png');

        // Create download link
        const link = document.createElement('a');
        link.download = 'HomeCare-Bill.png';
        link.href = imgData;
        link.click();

        // Remove bill element from DOM
        document.body.removeChild(billElement);

        // Show success alert
        handleDownloadReceipt();
      }).catch(error => {
        console.error('Error generating bill image:', error);

        // Remove bill element from DOM
        document.body.removeChild(billElement);

        // Show error alert through controller
        handleDownloadReceipt();
      });
    }).catch(error => {
      console.error('Error loading html2canvas:', error);

      // Remove bill element from DOM
      document.body.removeChild(billElement);

      // Show error alert through controller
      handleDownloadReceipt();
    });
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "white",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Your loading indicator components */}
        <Box sx={{
          position: "relative",
          width: "120px",
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2
        }}>
          {/* Loading spinner animation */}
          <Box sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "4px solid rgba(97,20,99,0.1)",
            borderTop: "4px solid #611463",
            borderRadius: "50%",
            animation: "spin 1.5s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" }
            }
          }} />
          <Box sx={{
            position: "absolute",
            width: "70%",
            height: "70%",
            border: "4px solid rgba(247,147,30,0.1)",
            borderBottom: "4px solid #f7931e",
            borderRadius: "50%",
            animation: "spinReverse 1.2s linear infinite",
            "@keyframes spinReverse": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(-360deg)" }
            }
          }} />
          <Box sx={{
            width: "20px",
            height: "20px",
            background: "linear-gradient(135deg, #611463, #f7931e)",
            borderRadius: "50%",
            animation: "pulse 1.5s infinite ease-in-out",
          }} />
        </Box>
        <Typography variant="h6" sx={{ color: "#611463", mt: 2 }}>
          ກຳລັງໂຫຼດ...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #611463 0%, #8E24AA 100%)",
        p: { xs: 1.5, sm: 2.5, md: 3.5 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: {
            xs: "100%",
            sm: "95%",
            md: "90%",
            lg: "80%",
          },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2.5, sm: 3.5, md: 4.5 },
            borderRadius: 3,
            maxWidth: "100%",
            mx: "auto",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, #611463, #8E24AA)",
            },
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h5"
            textAlign={'center'}
            sx={{
              fontSize: fontSize.title,
              fontWeight: "bold",
              mb: 3.5,
              color: "#611463",
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: "translateX(-50%)",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "3px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, #611463, #8E24AA)",
              }
            }}
          >
            ໃຫ້ຄະແນນ ແລະ ຄຳເຫັນ
          </Typography>

          {/* Service Details Section */}
          <Box sx={{ mb: 4.5 }}>
            {/* Header with download button */}
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2.5,
              pb: 1.5,
              borderBottom: "1px solid rgba(0,0,0,0.06)"
            }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ReceiptIcon sx={{ color: "#611463", mr: 1 }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: fontSize.subtitle,
                    fontWeight: "bold",
                    color: "#611463",
                  }}
                >
                  ລາຍລະອຽດບໍລິການ
                </Typography>
              </Box>

              {/* Download Button */}
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadPDF}
                data-download-receipt="true"
                sx={{
                  color: "#611463",
                  borderColor: "#611463",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  textTransform: "none",
                  px: 2,
                  py: 0.8,
                  transition: "all 0.3s",
                  boxShadow: "0 2px 8px rgba(97, 20, 99, 0.12)",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(97, 20, 99, 0.18)",
                    transform: "translateY(-1px)",
                    borderColor: "#611463",
                    backgroundColor: "rgba(97, 20, 99, 0.04)",
                  }
                }}
              >
                ດາວໂຫຼດໃບບິນ
              </Button>
            </Box>

            {/* Service Cards */}
            <Box sx={{ mb: 3.5 }}>
              {serviceDetails.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2.5,
                    borderRadius: 3,
                    boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 20px rgba(97, 20, 99, 0.15)"
                    },
                    border: "1px solid rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "5px",
                      height: "100%",
                      background: "linear-gradient(to bottom, #611463, #8E24AA)",
                    }
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    {/* Service card content */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={item.image}
                        sx={{
                          mr: 2,
                          width: 55,
                          height: 55,
                          boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                        }}
                      />
                      <Box flexGrow={1} sx={{ textAlign: "left" }}>
                        <Typography
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "#3a3a3a"
                          }}
                        >
                          {item.firstName} {item.surname}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.7 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: '0.9rem',
                              mr: 1.5,
                              background: "rgba(97, 20, 99, 0.08)",
                              px: 1.2,
                              py: 0.4,
                              borderRadius: "4px",
                              display: "inline-block"
                            }}
                          >
                            {item.gender}, {item.age} ປີ
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        fontWeight="bold"
                        sx={{
                          fontSize: "1.1rem",
                          color: "#611463",
                          background: "rgba(97, 20, 99, 0.08)",
                          px: 2,
                          py: 1,
                          borderRadius: "8px",
                        }}
                      >
                        {item.priceFormatted}
                      </Typography>
                    </Box>

                    {/* Category info */}
                    <Box sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      flexWrap: "wrap",
                      px: 1
                    }}>
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mr: 3,
                        mb: { xs: 1, sm: 0 },
                        background: "rgba(97, 20, 99, 0.04)",
                        py: 0.7,
                        px: 1.5,
                        borderRadius: "6px"
                      }}>
                        <CategoryIcon sx={{ fontSize: '1rem', color: '#611463', mr: 0.7 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.95rem', fontWeight: 'medium' }}>
                          {item.category}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Location info */}
                    <Box sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f9f6fc",
                      borderRadius: 2,
                      p: 1.5,
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      border: "1px dashed rgba(97, 20, 99, 0.15)"
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center", mr: 3, mb: { xs: 1, sm: 0 }, minWidth: "45%" }}>
                        <HomeIcon sx={{ fontSize: '1rem', color: '#611463', mr: 0.7 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                          {item.village}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationCityIcon sx={{ fontSize: '1rem', color: '#611463', mr: 0.7 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                          {item.city}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Billing Summary Card */}
              <Card
                sx={{
                  mb: 2.5,
                  borderRadius: 3,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(97, 20, 99, 0.1)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "5px",
                    height: "100%",
                    background: "linear-gradient(to bottom, #611463, #8E24AA)",
                  }
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: fontSize.subtitle,
                      fontWeight: "bold",
                      mb: 2,
                      color: "#611463",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <ReceiptIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                    ສະຫຼຸບການຊຳລະເງິນ
                  </Typography>

                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                    p: 1.2,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(97, 20, 99, 0.03)"
                    }
                  }}>
                    <Typography sx={{ fontSize: fontSize.text, color: "text.secondary" }}>
                      ລາຄາ
                    </Typography>
                    <Typography sx={{ fontSize: fontSize.text }}>
                      {serviceDetails.length > 0 ? serviceDetails[0].priceFormatted : billingData.servicePrice}
                    </Typography>
                  </Box>

                  <Box sx={{
                    height: "1px",
                    background: "linear-gradient(to right, rgba(97,20,99,0.05), rgba(97,20,99,0.15), rgba(97,20,99,0.05))",
                    my: 2
                  }} />

                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(97, 20, 99, 0.06)"
                  }}>
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      ລາຄາລວມ
                    </Typography>
                    <Typography sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#611463",
                      background: "white",
                      px: 2,
                      py: 0.5,
                      borderRadius: 1.5,
                      boxShadow: "0 2px 8px rgba(97, 20, 99, 0.1)"
                    }}>
                      {serviceDetails.length > 0 ? serviceDetails[0].priceFormatted : billingData.totalPrice}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Rating and Comment Section */}
          <Grid container spacing={3.5}>
            {/* Rating Box */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 3, md: 0 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: fontSize.subtitle,
                    mb: 1.5,
                    fontWeight: "bold",
                    color: "#611463",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  ໃຫ້ຄະແນນ
                </Typography>

                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(97, 20, 99, 0.12)",
                    height: { xs: "auto", md: "240px" },
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(97, 20, 99, 0.18)",
                    },
                    background: "linear-gradient(145deg, #ffffff, #f9f6fc)",
                    border: "1px solid rgba(97, 20, 99, 0.08)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    py: 4,
                    position: "relative",
                    zIndex: 1
                  }}>
                    <Typography
                      sx={{
                        fontSize: "1.15rem",
                        fontWeight: "bold",
                        mb: 4,
                        color: "#611463",
                        textAlign: "center",
                      }}
                    >
                      ກະລຸນາໃຫ້ຄະແນນບໍລິການ
                    </Typography>

                    <Rating
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue || 3);
                      }}
                      size="large"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#F7931e',
                        },
                        '& .MuiRating-iconHover': {
                          color: '#F7931e',
                        },
                        transform: "scale(1.2)",
                        mb: 2
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#666",
                        mt: 2,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: "rgba(97, 20, 99, 0.05)",
                        textAlign: "center"
                      }}
                    >
                      {rating === 5 ? "ດີຫຼາຍ" :
                        rating === 4 ? "ດີ" :
                          rating === 3 ? "ພໍໃຊ້ໄດ້" :
                            rating === 2 ? "ຄວນປັບປຸງ" :
                              rating === 1 ? "ບໍ່ພໍໃຈ" : ""}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            {/* Comment Box */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: fontSize.subtitle,
                    mb: 1.5,
                    fontWeight: "bold",
                    color: "#611463",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  ຄຳເຫັນຂອງທ່ານ
                </Typography>

                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(97, 20, 99, 0.12)",
                    height: { xs: "auto", md: "240px" },
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(97, 20, 99, 0.18)",
                    },
                    border: "1px solid rgba(97, 20, 99, 0.08)",
                  }}
                >
                  <CardContent sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 2.5
                  }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="ໃສ່ຄຳເຫັນທີ່ນີ້"
                      multiline
                      rows={6}
                      value={comment}
                      onChange={handleCommentChange}
                      sx={{
                        mb: 1,
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "0.3s",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8E24AA"
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#611463",
                            borderWidth: "2px"
                          }
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "#611463"
                          }
                        },
                        "& .MuiInputBase-input": {
                          fontSize: fontSize.text
                        }
                      }}
                      error={!!commentError}
                      helperText={commentError || `${comment.length}/500 ຕົວອັກສອນ`}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{
            mt: 4.5,
            display: "flex",
            justifyContent: "center",
            position: "relative"
          }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontSize: fontSize.button,
                px: 4.5,
                py: 1.5,
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 200 },
                background: "linear-gradient(135deg, #611463 0%, #8E24AA 100%)",
                boxShadow: "0 8px 20px rgba(97, 20, 99, 0.25)",
                borderRadius: "12px",
                textTransform: "none",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: "0 12px 28px rgba(97, 20, 99, 0.35)",
                  transform: "translateY(-2px)",
                  background: "linear-gradient(135deg, #4a0d4c 0%, #7b1fa2 100%)",
                },
              }}
              onClick={handleSubmitComment}
              data-comment-submit="true"
            >
              ສົ່ງຄຳເຫັນ
            </Button>
          </Box>
        </Paper>

        {/* Navigation Lock Indicator */}
        {showLockMessage && (
          <Box
            sx={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'rgba(97, 20, 99, 0.9)',
              color: 'white',
              py: 1.5,
              px: 3,
              borderRadius: '30px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <LockIcon sx={{ fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              ກະລຸນາສົ່ງຄຳເຫັນຂອງທ່ານກ່ອນນຳທາງໄປໜ້າອື່ນ
            </Typography>
          </Box>
        )}

        {/* Alerts */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertSeverity}
            variant="filled"
            sx={{
              width: "100%",
              fontSize: "0.95rem",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CommentPage;