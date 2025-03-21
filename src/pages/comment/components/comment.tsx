import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  TextField,
  useTheme,
  useMediaQuery,
  Rating,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from '@mui/icons-material/Star';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PAYMENT_PATH, SERVICE_STATUS_PATH } from "../../../routes/path";
// No need for jsPDF import anymore, using html2canvas dynamically

// Font size constants
const fontSize = {
  title: "1.6rem",
  subtitle: "1.1rem",
  text: "0.95rem",
  button: "1rem",
};

// Enhanced service data with more details (same as payment page)
const serviceItems = [
  {
    id: 1,
    firstName: "ອຳມະລິນ",
    surname: "ອຸນາລົມ",
    price: 250000,
    priceFormatted: "250,000 KIP",
    image: "/api/placeholder/40/40",
    category: "ແມ່ບ້ານ",
    gender: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "ວຽງຈັນ",
  },
];

// New billing data based on the provided image
const billingData = {
  customerName: "ອຳມະລິນ ອຸນາລົມ",
  serviceType: "ທຳຄວາມສະອາດ",
  servicePrice: "500,000 ກີບ",
  discount: "50,000 ກີບ",
  totalPrice: "450,000 ກີບ",
};

const CommentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State variables
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [commentError, setCommentError] = useState("");

  // Handle comment change
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);

    // Validate comment
    if (value.length > 500) {
      setCommentError("ຄຳເຫັນຍາວເກີນໄປ (ສູງສຸດ 500 ຕົວອັກສອນ)");
    } else {
      setCommentError("");
    }
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      setAlertMessage("ກະລຸນາໃສ່ຄຳເຫັນຂອງທ່ານ!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    setAlertMessage("ສົ່ງຄຳເຫັນສຳເລັດແລ້ວ!");
    setAlertSeverity("success");
    setAlertOpen(true);

    // Navigate to confirmation page after a short delay
    setTimeout(() => {
      navigate(SERVICE_STATUS_PATH);
    }, 1500);
  };

  // Generate and download beautiful receipt as PNG
  const handleDownloadPDF = () => {
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
      receiptNumber.innerHTML = '<span style="font-weight:bold;">Receipt No:</span> HC-' + Math.floor(10000 + Math.random() * 90000);

      const receiptDate = document.createElement('div');
      const today = new Date();
      receiptDate.innerHTML = '<span style="font-weight:bold;">Date:</span> ' + today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

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
      customerTitle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#611463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ຂໍ້ມູນລູກຄ້າ';

      customerCard.appendChild(customerTitle);

      const customerName = document.createElement('div');
      customerName.style.fontWeight = 'bold';
      customerName.style.fontSize = '18px';
      customerName.style.marginBottom = '5px';
      customerName.textContent = 'ອຳມະລິນ ອຸນາລົມ';

      const customerDetails = document.createElement('div');
      customerDetails.style.fontSize = '14px';
      customerDetails.style.color = '#666';
      customerDetails.textContent = 'ອາຍຸ, 21ປີ ບ້ານ ໂນນສະຫວ່າງ ເມືອງ ໄຊເສດຖາ';

      customerCard.appendChild(customerName);
      customerCard.appendChild(customerDetails);
      content.appendChild(customerCard);

      // Create service info section
      const serviceTitle = document.createElement('div');
      serviceTitle.style.fontWeight = 'bold';
      serviceTitle.style.fontSize = '16px';
      serviceTitle.style.marginBottom = '15px';
      serviceTitle.style.color = '#611463';
      serviceTitle.style.display = 'flex';
      serviceTitle.style.alignItems = 'center';
      serviceTitle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#611463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg> ການບໍລິການ';
      content.appendChild(serviceTitle);

      // Service table with modern styling
      const serviceTable = document.createElement('table');
      serviceTable.style.width = '100%';
      serviceTable.style.borderCollapse = 'collapse';
      serviceTable.style.marginBottom = '30px';

      // Table header
      const tableHeader = document.createElement('thead');
      tableHeader.innerHTML = `
        <tr style="background-color: #f2f2f2; color: #444;">
          <th style="padding: 12px 15px; text-align: left; border-top-left-radius: 8px; border-bottom-left-radius: 8px;">ລາຍການ</th>
          <th style="padding: 12px 15px; text-align: right; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">ລາຄາ</th>
        </tr>
      `;
      serviceTable.appendChild(tableHeader);

      // Table body
      const tableBody = document.createElement('tbody');
      tableBody.innerHTML = `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 15px 15px; text-align: left;">ທຳຄວາມສະອາດ</td>
          <td style="padding: 15px 15px; text-align: right;">500,000 ກີບ</td>
        </tr>
      `;
      serviceTable.appendChild(tableBody);
      content.appendChild(serviceTable);

      // Add price summary in a card-like box
      const priceSummaryCard = document.createElement('div');
      priceSummaryCard.style.backgroundColor = '#fff';
      priceSummaryCard.style.borderRadius = '12px';
      priceSummaryCard.style.padding = '20px';
      priceSummaryCard.style.marginBottom = '20px';
      priceSummaryCard.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
      priceSummaryCard.style.border = '1px solid #eee';

      // Summary title
      const summaryTitle = document.createElement('div');
      summaryTitle.style.fontWeight = 'bold';
      summaryTitle.style.fontSize = '16px';
      summaryTitle.style.marginBottom = '15px';
      summaryTitle.style.color = '#611463';
      summaryTitle.style.display = 'flex';
      summaryTitle.style.alignItems = 'center';
      summaryTitle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#611463" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> ສະຫຼຸບລາຄາ';
      priceSummaryCard.appendChild(summaryTitle);

      // Price rows
      const priceRow1 = document.createElement('div');
      priceRow1.style.display = 'flex';
      priceRow1.style.justifyContent = 'space-between';
      priceRow1.style.margin = '12px 0';
      priceRow1.style.fontSize = '15px';

      const priceLabel1 = document.createElement('div');
      priceLabel1.textContent = 'ລາຄາ';
      priceLabel1.style.color = '#666';

      const priceValue1 = document.createElement('div');
      priceValue1.textContent = '500,000 ກີບ';

      priceRow1.appendChild(priceLabel1);
      priceRow1.appendChild(priceValue1);
      priceSummaryCard.appendChild(priceRow1);

      const priceRow2 = document.createElement('div');
      priceRow2.style.display = 'flex';
      priceRow2.style.justifyContent = 'space-between';
      priceRow2.style.margin = '12px 0';
      priceRow2.style.fontSize = '15px';

      const priceLabel2 = document.createElement('div');
      priceLabel2.textContent = 'ສ່ວນຫຼຸດ';
      priceLabel2.style.color = '#666';

      const priceValue2 = document.createElement('div');
      priceValue2.textContent = '50,000 ກີບ';
      priceValue2.style.color = '#d32f2f';

      priceRow2.appendChild(priceLabel2);
      priceRow2.appendChild(priceValue2);
      priceSummaryCard.appendChild(priceRow2);

      // Add divider
      const divider = document.createElement('div');
      divider.style.height = '1px';
      divider.style.backgroundColor = '#eee';
      divider.style.margin = '15px 0';
      priceSummaryCard.appendChild(divider);

      // Total row with emphasized styling
      const totalRow = document.createElement('div');
      totalRow.style.display = 'flex';
      totalRow.style.justifyContent = 'space-between';
      totalRow.style.margin = '15px 0 5px 0';
      totalRow.style.fontSize = '18px';
      totalRow.style.fontWeight = 'bold';

      const totalLabel = document.createElement('div');
      totalLabel.textContent = 'ລາຄາລວມ';

      const totalValue = document.createElement('div');
      totalValue.textContent = '450,000 ກີບ';
      totalValue.style.color = '#611463';

      totalRow.appendChild(totalLabel);
      totalRow.appendChild(totalValue);
      priceSummaryCard.appendChild(totalRow);

      content.appendChild(priceSummaryCard);

      // Create thank you message
      const thankYou = document.createElement('div');
      thankYou.style.backgroundColor = '#f0f5ff';
      thankYou.style.borderRadius = '12px';
      thankYou.style.padding = '15px 20px';
      thankYou.style.textAlign = 'center';
      thankYou.style.color = '#611463';
      thankYou.style.fontSize = '15px';
      thankYou.style.marginBottom = '30px';
      thankYou.style.border = '1px dashed #c5cae9';
      thankYou.innerHTML = '<b>ຂອບໃຈ</b> ທີ່ໃຊ້ບໍລິການຂອງພວກເຮົາ!';

      content.appendChild(thankYou);

      billContainer.appendChild(content);

      // Add footer
      const footer = document.createElement('div');
      footer.style.backgroundColor = '#f9f9f9';
      footer.style.borderTop = '1px solid #eee';
      footer.style.padding = '20px 40px';
      footer.style.textAlign = 'center';
      footer.style.fontSize = '14px';
      footer.style.color = '#666';

      const footerContent = document.createElement('div');
      footerContent.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px; color: #444;">Contact Us</div>
        <div style="margin-bottom: 5px;">020 54821624</div>
        <div style="margin-bottom: 5px;">✉️ homecaredolaebn@gmail.com</div>
        <div style="margin-top: 15px; font-size: 12px; color: #999;">© ${new Date().getFullYear()} HomeCare. All rights reserved.</div>
      `;

      footer.appendChild(footerContent);
      billContainer.appendChild(footer);

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
        setAlertMessage("ດາວໂຫຼດໃບບິນສຳເລັດແລ້ວ!");
        setAlertSeverity("success");
        setAlertOpen(true);
      }).catch(error => {
        console.error('Error generating bill image:', error);

        // Remove bill element from DOM
        document.body.removeChild(billElement);

        // Show error alert
        setAlertMessage("ເກີດຂໍ້ຜິດພາດໃນການດາວໂຫຼດໃບບິນ!");
        setAlertSeverity("error");
        setAlertOpen(true);
      });
    }).catch(error => {
      console.error('Error loading html2canvas:', error);

      // Remove bill element from DOM
      document.body.removeChild(billElement);

      // Show error alert
      setAlertMessage("ເກີດຂໍ້ຜິດພາດໃນການດາວໂຫຼດໃບບິນ!");
      setAlertSeverity("error");
      setAlertOpen(true);
    });
  };

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

          {/* Top Section - Service Details (Full Width) */}
          <Box sx={{ mb: 4.5 }}>
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
              // Fixed code:
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadPDF}
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

            {/* Service Items - Removed maxHeight and overflowY to show all content */}
            <Box sx={{ mb: 3.5 }}>
              {serviceItems.map((item) => (
                <Card
                  key={item.id}
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
                    {/* Main info row */}
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

                    {/* Additional info row */}
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

                    {/* Location info row */}
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
                      500,000 ກີບ
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                    p: 1.2,
                    borderRadius: 2,
                    backgroundColor: "rgba(244, 67, 54, 0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.08)"
                    }
                  }}>
                    <Typography sx={{ fontSize: fontSize.text, color: "text.secondary" }}>
                      ສ່ວນຫຼຸດ
                    </Typography>
                    <Typography sx={{ fontSize: fontSize.text, color: "#d32f2f" }}>
                      - 50,000 ກີບ
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
                      450,000 ກີບ
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Bottom Section - Rating and Comment (Side by Side) */}
          <Grid container spacing={3.5}>
            {/* Left Box - Rating */}
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

                {/* Rating Card */}
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
                        setRating(newValue);
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

                  {/* Decorative elements */}
                  <Box sx={{
                    position: "absolute",
                    top: "-15%",
                    left: "-10%",
                    width: "60%",
                    height: "50%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(97,20,99,0.05) 0%, rgba(97,20,99,0) 70%)",
                    zIndex: 0
                  }} />

                  <Box sx={{
                    position: "absolute",
                    bottom: "-15%",
                    right: "-10%",
                    width: "60%",
                    height: "50%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(97,20,99,0.05) 0%, rgba(97,20,99,0) 70%)",
                    zIndex: 0
                  }} />
                </Card>
              </Box>
            </Grid>

            {/* Right Box - Comment Input */}
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

          {/* Action Buttons */}
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
              onClick={handleCommentSubmit}
            >
              ສົ່ງຄຳເຫັນ
            </Button>

            {/* Decorative elements */}
            <Box sx={{
              position: "absolute",
              width: "150px",
              height: "8px",
              bottom: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "4px",
              background: "linear-gradient(90deg, rgba(97,20,99,0) 0%, rgba(97,20,99,0.1) 50%, rgba(97,20,99,0) 100%)",
            }} />
          </Box>
        </Paper>

        {/* Snackbar Alert */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            "& .MuiAlert-root": {
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }
          }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertSeverity}
            variant="filled"
            sx={{
              width: "100%",
              fontSize: "0.95rem",
              "& .MuiAlert-icon": {
                fontSize: "1.5rem"
              },
              "& .MuiAlert-message": {
                px: 1
              }
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