import React from "react";
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
  Divider,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useCommentController from "../controllers/index";

// Font size constants
const fontSize = {
  title: "1.6rem",
  subtitle: "1.1rem",
  text: "0.95rem",
  button: "1rem",
};

// Translation mappings - English to Lao (copied from PaymentPage controller)
const categoryTranslation: Record<string, string> = {
  'cleaning': 'ທຳຄວາມສະອາດ',
  'electrical': 'ສ້ອມແປງໄຟຟ້າ',
  'aircon': 'ສ້ອມແປງແອອາກາດ',
  'air conditioning': 'ສ້ອມແປງແອອາກາດ',
  'plumbing': 'ສ້ອມແປງປະປາ',
  'moving': 'ແກ່ເຄື່ອງ',
  'transportation': 'ແກ່ເຄື່ອງ',
  'relocation': 'ແກ່ເຄື່ອງ',
  'bathroom': 'ດູດສ້ວມ',
  'toilet': 'ດູດສ້ວມ',
  'septic': 'ດູດສ້ວມ',
  'pest': 'ກຳຈັດປວກ',
  'pest control': 'ກຳຈັດປວກ',
  'extermination': 'ກຳຈັດປວກ',
  'house cleaning': 'ທຳຄວາມສະອາດ',
  'home cleaning': 'ທຳຄວາມສະອາດ',
  'electrical repair': 'ສ້ອມແປງໄຟຟ້າ',
  'electrical service': 'ສ້ອມແປງໄຟຟ້າ',
  'air conditioner repair': 'ສ້ອມແປງແອອາກາດ',
  'ac repair': 'ສ້ອມແປງແອອາກາດ',
  'plumbing repair': 'ສ້ອມແປງປະປາ',
  'water pipe repair': 'ສ້ອມແປງປະປາ',
  'moving service': 'ແກ່ເຄື່ອງ',
  'delivery': 'ແກ່ເຄື່ອງ',
  'septic cleaning': 'ດູດສ້ວມ',
  'sewage cleaning': 'ດູດສ້ວມ',
  'other': 'ອື່ນໆ',
  'general': 'ທົ່ວໄປ'
};

// Gender translation mapping - English to Lao
const genderTranslation: Record<string, string> = {
  'male': 'ຊາຍ',
  'female': 'ຍິງ',
  'man': 'ຊາຍ',
  'woman': 'ຍິງ',
  'men': 'ຊາຍ',
  'women': 'ຍິງ',
  'boy': 'ຊາຍ',
  'girl': 'ຍິງ',
  'm': 'ຊາຍ',
  'f': 'ຍິງ',
  'other': 'ອື່ນໆ',
  'unknown': 'ບໍ່ລະບຸ'
};

// City translation mapping - English to Lao (Vientiane Districts)
const cityTranslation: Record<string, string> = {
  'chanthabuly': 'ຈັນທະບູລີ',
  'chanthabouly': 'ຈັນທະບູລີ',
  'sikhottabong': 'ສີໂຄດຕະບອງ',
  'xaysetha': 'ໄຊເສດຖາ',
  'sisattanak': 'ສີສັດຕະນາກ',
  'naxaithong': 'ນາຊາຍທອງ',
  'xaytany': 'ໄຊທານີ',
  'hadxaifong': 'ຫາດຊາຍຟອງ',
  'vientiane': 'ວຽງຈັນ',
  'vientiane capital': 'ນະຄອນຫຼວງວຽງຈັນ'
};

// Translation functions (copied from PaymentPage controller)
const translateCategoryToLao = (englishCategory: string): string => {
  if (!englishCategory) return 'ອື່ນໆ';
  
  const normalizedCategory = englishCategory.toLowerCase().trim();
  
  if (categoryTranslation[normalizedCategory]) {
    return categoryTranslation[normalizedCategory];
  }
  
  for (const [key, value] of Object.entries(categoryTranslation)) {
    if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
      return value;
    }
  }
  
  return englishCategory || 'ອື່ນໆ';
};

const translateGenderToLao = (englishGender: string): string => {
  if (!englishGender) return 'ບໍ່ລະບຸ';
  
  const normalizedGender = englishGender.toLowerCase().trim();
  
  if (genderTranslation[normalizedGender]) {
    return genderTranslation[normalizedGender];
  }
  
  for (const [key, value] of Object.entries(genderTranslation)) {
    if (normalizedGender.includes(key) || key.includes(normalizedGender)) {
      return value;
    }
  }
  
  return englishGender || 'ບໍ່ລະບຸ';
};

const translateCityToLao = (englishCity: string): string => {
  if (!englishCity) return 'ວຽງຈັນ';
  
  const normalizedCity = englishCity.toLowerCase().trim();
  
  if (cityTranslation[normalizedCity]) {
    return cityTranslation[normalizedCity];
  }
  
  for (const [key, value] of Object.entries(cityTranslation)) {
    if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
      return value;
    }
  }
  
  return englishCity || 'ວຽງຈັນ';
};

const CommentPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get everything from the controller including distance fee data
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
    // Distance fee data
    baseAmount,
    distanceFee,
    distanceFeeReason,
    totalAmount,
    userCity,
    employeeCity,
    setRating,
    handleCommentChange,
    handleAlertClose,
    handleCommentSubmit,
    handleDownloadReceipt,
    formatCurrency
  } = useCommentController();

  // Show enhanced loading state
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
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(97,20,99,0.05) 0%, rgba(97,20,99,0) 70%)",
            animation: "pulse 3s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.3 },
              "50%": { transform: "scale(1.1)", opacity: 0.1 },
              "100%": { transform: "scale(1)", opacity: 0.3 }
            }
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,147,30,0.05) 0%, rgba(247,147,30,0) 70%)",
            animation: "pulse 3s infinite ease-in-out 1s",
          }}
        />

        {/* Main loading spinner with custom animation */}
        <Box
          sx={{
            position: "relative",
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2
          }}
        >
          {/* Outer spinning circle - purple */}
          <Box
            sx={{
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
            }}
          />

          {/* Inner spinning circle - orange */}
          <Box
            sx={{
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
            }}
          />

          {/* Center pulsing dot - mix */}
          <Box
            sx={{
              width: "20px",
              height: "20px",
              background: "linear-gradient(135deg, #611463, #f7931e)",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
        </Box>

        {/* Loading text with animation */}
        <Typography
          variant="h6"
          sx={{
            color: "#611463",
            mt: 2,
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: "1px",
            animation: "fadeInOut 1.5s infinite ease-in-out",
            "@keyframes fadeInOut": {
              "0%": { opacity: 0.5 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.5 }
            }
          }}
        >
          ກຳລັງໂຫຼດ...
        </Typography>

        {/* Animated progress dots - alternating colors */}
        <Box
          sx={{
            display: "flex",
            mt: 1,
            gap: "8px",
            alignItems: "center"
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: "8px",
                height: "8px",
                backgroundColor: i === 1 ? "#f7931e" : "#611463",
                borderRadius: "50%",
                opacity: 0.7,
                animation: "bounce 1.4s infinite ease-in-out",
                animationDelay: `${i * 0.2}s`,
                "@keyframes bounce": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.5)" }
                }
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  // Generate and download beautiful receipt as PNG with distance fee
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
      customerDetails.textContent = service ? `${translateGenderToLao(service.gender)}, ${service.village} ${translateCityToLao(service.city)}` : 'ບ້ານ ໂນນສະຫວ່າງ ເມືອງ ໄຊເສດຖາ';

      customerCard.appendChild(customerName);
      customerCard.appendChild(customerDetails);
      content.appendChild(customerCard);

      // Distance fee information if applicable
      if (distanceFee > 0 && (employeeCity || userCity)) {
        const distanceCard = document.createElement('div');
        distanceCard.style.backgroundColor = '#fff3e0';
        distanceCard.style.borderRadius = '12px';
        distanceCard.style.padding = '15px 20px';
        distanceCard.style.marginBottom = '25px';
        distanceCard.style.border = '1px solid #ffcc80';

        const distanceTitle = document.createElement('div');
        distanceTitle.style.fontWeight = 'bold';
        distanceTitle.style.fontSize = '14px';
        distanceTitle.style.marginBottom = '8px';
        distanceTitle.style.color = '#ef6c00';
        distanceTitle.style.display = 'flex';
        distanceTitle.style.alignItems = 'center';
        distanceTitle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef6c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path><path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path><path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path><path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1s .448 1 1 1z"></path></svg> ຄ່າໄລຍະທາງ';

        const routeInfo = document.createElement('div');
        routeInfo.style.fontSize = '12px';
        routeInfo.style.color = '#666';
        routeInfo.style.marginBottom = '5px';
        routeInfo.textContent = `${employeeCity ? translateCityToLao(employeeCity) : 'ບໍ່ທາງ'} → ${userCity ? translateCityToLao(userCity) : 'ບໍ່ທາງ'}`;

        const feeInfo = document.createElement('div');
        feeInfo.style.fontSize = '11px';
        feeInfo.style.color = '#666';
        feeInfo.style.fontStyle = 'italic';
        feeInfo.textContent = distanceFeeReason;

        distanceCard.appendChild(distanceTitle);
        distanceCard.appendChild(routeInfo);
        distanceCard.appendChild(feeInfo);
        content.appendChild(distanceCard);
      }

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
          <td style="padding: 15px 15px; text-align: left;">${service ? translateCategoryToLao(service.service || service.category) : translateCategoryToLao(billingData.serviceType)}</td>
          <td style="padding: 15px 15px; text-align: right;">${formatCurrency(baseAmount)}</td>
        </tr>
      `;

      // Add distance fee row if applicable
      if (distanceFee > 0) {
        tableBody.innerHTML += `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 15px 15px; text-align: left; color: #ef6c00;">ຄ່າໄລຍະທາງ</td>
            <td style="padding: 15px 15px; text-align: right; color: #ef6c00;">${formatCurrency(distanceFee)}</td>
          </tr>
        `;
      }

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
      priceLabel1.textContent = 'ລາຄາພື້ນຖານ';
      priceLabel1.style.color = '#666';

      const priceValue1 = document.createElement('div');
      priceValue1.textContent = formatCurrency(baseAmount);

      priceRow1.appendChild(priceLabel1);
      priceRow1.appendChild(priceValue1);
      priceSummaryCard.appendChild(priceRow1);

      // Distance fee row if applicable
      if (distanceFee > 0) {
        const priceRow2 = document.createElement('div');
        priceRow2.style.display = 'flex';
        priceRow2.style.justifyContent = 'space-between';
        priceRow2.style.margin = '12px 0';
        priceRow2.style.fontSize = '15px';

        const priceLabel2 = document.createElement('div');
        priceLabel2.textContent = 'ຄ່າໄລຍະທາງ';
        priceLabel2.style.color = '#ef6c00';

        const priceValue2 = document.createElement('div');
        priceValue2.textContent = formatCurrency(distanceFee);
        priceValue2.style.color = '#ef6c00';

        priceRow2.appendChild(priceLabel2);
        priceRow2.appendChild(priceValue2);
        priceSummaryCard.appendChild(priceRow2);
      }

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
      totalValue.textContent = formatCurrency(totalAmount);
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

            {/* Service Items - Display actual data with Lao translations */}
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
                            {translateGenderToLao(item.gender)}
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
                        {formatCurrency(baseAmount)}
                      </Typography>
                    </Box>

                    {/* Additional info row with Lao translation */}
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
                          {translateCategoryToLao(item.category)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Location info row with Lao translation */}
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
                          {translateCityToLao(item.city)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Enhanced Distance Fee Display - Same as LocationPage/PaymentPage with Lao city names */}
              {(employeeCity || userCity) && distanceFee > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Card
                    sx={{
                      backgroundColor: "#f0e9f1",
                      borderRadius: 2,
                      border: '1px solid rgba(97, 20, 99, 0.1)',
                      borderLeft: '3px solid #8a1c8d'
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      {/* Header with icon and title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <DirectionsCarIcon sx={{ fontSize: '1rem', color: '#8a1c8d', mr: 1 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#611463', fontWeight: 600 }}>
                          ຄ່າໄລຍະທາງ
                        </Typography>
                      </Box>

                      {/* Route Information with Lao city names */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1,
                        mb: 1.5
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '60%' }}>
                          {/* From City */}
                          <Box sx={{ 
                            bgcolor: 'rgba(97, 20, 99, 0.1)', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            border: '1px solid rgba(97, 20, 99, 0.2)'
                          }}>
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#611463', fontWeight: 500 }}>
                              {employeeCity ? translateCityToLao(employeeCity) : 'ບໍ່ທາງ'}
                            </Typography>
                          </Box>

                          {/* Arrow */}
                          <KeyboardArrowRightIcon sx={{ fontSize: '1.2rem', color: '#8a1c8d', mx: 0.5 }} />

                          {/* To City */}
                          <Box sx={{ 
                            bgcolor: 'rgba(97, 20, 99, 0.1)', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            border: '1px solid rgba(97, 20, 99, 0.2)'
                          }}>
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#611463', fontWeight: 500 }}>
                              {userCity ? translateCityToLao(userCity) : 'ບໍ່ທາງ'}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Fee Amount */}
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            fontWeight: "bold",
                            color: distanceFee === 8000 ? "#10b981" : "#f7931e",
                            bgcolor: distanceFee === 8000 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(247, 147, 30, 0.1)',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            border: `1px solid ${distanceFee === 8000 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(247, 147, 30, 0.3)'}`
                          }}
                        >
                          +{formatCurrency(distanceFee)}
                        </Typography>
                      </Box>

                      {/* Fee Reason/Category */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ 
                          fontSize: '0.8rem', 
                          color: '#666',
                          fontStyle: 'italic'
                        }}>
                          {distanceFeeReason}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Enhanced Billing Summary Card with Distance Fee Breakdown */}
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

                  {/* Base Amount */}
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
                      ລາຄາພື້ນຖານ
                    </Typography>
                    <Typography sx={{ fontSize: fontSize.text }}>
                      {formatCurrency(baseAmount)}
                    </Typography>
                  </Box>

                  {/* Distance Fee - only show if > 0 */}
                  {distanceFee > 0 && (
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                      p: 1.2,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "rgba(247, 147, 30, 0.03)"
                      }
                    }}>
                      <Typography sx={{ fontSize: fontSize.text, color: "#f7931e" }}>
                        ຄ່າໄລຍະທາງ
                      </Typography>
                      <Typography sx={{ fontSize: fontSize.text, color: "#f7931e", fontWeight: 500 }}>
                        {formatCurrency(distanceFee)}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{
                    height: "1px",
                    background: "linear-gradient(to right, rgba(97,20,99,0.05), rgba(97,20,99,0.15), rgba(97,20,99,0.05))",
                    my: 2
                  }} />

                  {/* Total Amount */}
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
                      {formatCurrency(totalAmount)}
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