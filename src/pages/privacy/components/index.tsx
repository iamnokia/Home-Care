import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CONTACT_US_PATH } from "../../../routes/path";

// Define colors to match the footer
const PRIMARY_PURPLE = "#611463";
const ACCENT_ORANGE = "#f7931e";

const TermsAndPrivacyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Last updated date
  const lastUpdated = "March 15, 2025";

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Page Title */}
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 700, 
          color: PRIMARY_PURPLE,
          textAlign: 'center',
          mb: 4
        }}
      >
        Legal Information
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'center', 
          mb: 5,
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        Please read these terms carefully. They contain important information about your rights and obligations.
      </Typography>

      {/* Tab Navigation */}
      <Paper 
        elevation={3} 
        sx={{ 
          mb: 5,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant={isMobile ? "fullWidth" : "standard"}
          centered
          sx={{
            bgcolor: PRIMARY_PURPLE,
            '& .MuiTab-root': {
              color: 'white',
              fontWeight: 500,
              opacity: 0.7,
              py: 2,
              '&.Mui-selected': {
                color: 'white',
                opacity: 1,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: ACCENT_ORANGE,
              height: 3,
            },
          }}
        >
          <Tab 
            icon={<GavelIcon />} 
            iconPosition="start"
            label="Terms of Use" 
            id="tab-0" 
            aria-controls="tabpanel-0" 
          />
          <Tab 
            icon={<SecurityIcon />} 
            iconPosition="start"
            label="Privacy Policy" 
            id="tab-1" 
            aria-controls="tabpanel-1" 
          />
        </Tabs>

        {/* Terms of Use Content */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 0}
          id="tabpanel-0"
          aria-labelledby="tab-0"
          sx={{ p: { xs: 3, md: 5 } }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: PRIMARY_PURPLE, fontWeight: 600 }}>
            Terms of Use
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Last Updated: {lastUpdated}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing and using HomeCare's services ("Services"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use our Services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            2. Description of Services
          </Typography>
          <Typography variant="body1" paragraph>
            HomeCare provides home maintenance services including but not limited to plumbing, electrical work, cleaning, gardening, and general repairs. Our services are available through our website, mobile applications, and direct customer service.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            3. User Accounts
          </Typography>
          <Typography variant="body1" paragraph>
            3.1. Account Creation: To use certain features of our Services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process.
          </Typography>
          <Typography variant="body1" paragraph>
            3.2. Account Security: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify HomeCare immediately of any unauthorized use of your account.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            4. Service Booking and Cancellation
          </Typography>
          <Typography variant="body1" paragraph>
            4.1. Booking: When you book a service, you agree to provide accurate information about your service needs and location.
          </Typography>
          <Typography variant="body1" paragraph>
            4.2. Cancellation: Cancellation policies vary by service. Please refer to the specific service details or contact our customer service for information.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            5. Payment Terms
          </Typography>
          <Typography variant="body1" paragraph>
            5.1. Fees: Service fees will be clearly displayed before confirmation. Additional charges may apply for services outside the standard scope.
          </Typography>
          <Typography variant="body1" paragraph>
            5.2. Payment Methods: We accept various payment methods as indicated on our platform.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            6. User Conduct
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to use our Services to:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Harass, threaten, or harm our staff or other users</li>
            <li>Interfere with the proper functioning of our Services</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            7. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content, features, and functionality of our Services, including but not limited to text, graphics, logos, and software, are owned by HomeCare and are protected by copyright, trademark, and other intellectual property laws.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            8. Disclaimer of Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            Our Services are provided "as is" without any warranties, expressed or implied. HomeCare does not warrant that our Services will be error-free or uninterrupted.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            9. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            HomeCare shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our Services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            10. Indemnification
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to indemnify and hold HomeCare harmless from any claims, damages, liabilities, and expenses arising from your use of our Services or violation of these Terms.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            11. Modification of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            HomeCare reserves the right to modify these Terms at any time. We will provide notice of significant changes. Your continued use of our Services after such modifications constitutes your acceptance of the updated Terms.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            12. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms shall be governed by and construed in accordance with the laws of Laos, without regard to its conflict of law principles.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            13. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at homecaredolaebn@gmail.com or +856-20-5482-1624.
          </Typography>
        </Box>

        {/* Privacy Policy Content */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 1}
          id="tabpanel-1"
          aria-labelledby="tab-1"
          sx={{ p: { xs: 3, md: 5 } }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: PRIMARY_PURPLE, fontWeight: 600 }}>
            Privacy Policy
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Last Updated: {lastUpdated}
          </Typography>

          <Typography variant="body1" paragraph>
            At HomeCare, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            1.1. Personal Information: We may collect personal information such as:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
            <li>Name, email address, phone number, and home address</li>
            <li>Payment information</li>
            <li>Service preferences and history</li>
            <li>Communication with our customer service</li>
          </Typography>
          <Typography variant="body1" paragraph>
            1.2. Automatically Collected Information: When you use our Services, we may automatically collect:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
            <li>Device information (e.g., IP address, browser type)</li>
            <li>Usage data (e.g., pages visited, time spent)</li>
            <li>Location data (with your consent)</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use your information for purposes including:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
            <li>Providing and improving our Services</li>
            <li>Processing payments and transactions</li>
            <li>Communicating with you about services, promotions, and updates</li>
            <li>Analyzing usage patterns to enhance user experience</li>
            <li>Complying with legal obligations</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            3. Information Sharing and Disclosure
          </Typography>
          <Typography variant="body1" paragraph>
            3.1. Service Providers: We may share your information with third-party service providers who help us deliver our Services.
          </Typography>
          <Typography variant="body1" paragraph>
            3.2. Legal Requirements: We may disclose your information if required by law or in response to valid requests by public authorities.
          </Typography>
          <Typography variant="body1" paragraph>
            3.3. Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as a business asset.
          </Typography>
          <Typography variant="body1" paragraph>
            3.4. With Your Consent: We may share your information in other ways with your explicit consent.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            5. Your Rights and Choices
          </Typography>
          <Typography variant="body1" paragraph>
            Depending on your location, you may have the right to:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
            <li>Access and receive a copy of your personal information</li>
            <li>Rectify inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Restrict or object to certain processing of your information</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time (where processing is based on consent)</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            6. Cookies and Similar Technologies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar technologies to enhance your experience, analyze usage, and collect information about visitors to our websites. You can control cookies through your browser settings.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            7. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            8. International Data Transfers
          </Typography>
          <Typography variant="body1" paragraph>
            Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have different data protection laws than your country of residence.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            9. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
            10. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>
          <Typography variant="body1" paragraph>
            Email: homecaredolaebn@gmail.com<br />
            Phone: +856-20-5482-1624<br />
            Address: Vientiane, Laos
          </Typography>
        </Box>
      </Paper>

      {/* Call to Action */}
      <Box 
        sx={{ 
          textAlign: 'center',
          mt: 6,
          p: 4,
          bgcolor: 'rgba(97, 20, 99, 0.05)',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: PRIMARY_PURPLE }}>
          Have Questions About Our Policies?
        </Typography>
        <Typography variant="body1" paragraph>
          Our customer support team is here to help clarify any questions you might have.
        </Typography>
        <Box 
          component="a" 
          href= {CONTACT_US_PATH}
          sx={{
            display: 'inline-block',
            mt: 2,
            px: 4,
            py: 1.5,
            bgcolor: ACCENT_ORANGE,
            color: 'white',
            borderRadius: 2,
            fontWeight: 600,
            textDecoration: 'none',
            '&:hover': {
              bgcolor: '#e5821c',
              transform: 'translateY(-3px)',
              boxShadow: '0 5px 10px rgba(0,0,0,0.2)'
            },
            transition: 'all 0.3s'
          }}
        >
          Contact Support
        </Box>
      </Box>
    </Container>
  );
};

export default TermsAndPrivacyPage;