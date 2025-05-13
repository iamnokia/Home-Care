// src/routes/index.tsx
import MainLayout from "../layout";
import NotFoundPage from "../pages/404";
import CommentPage from "../pages/comment/components/comment";
import Company_searchPage from "../pages/company_search";
import BlogProfile from "../pages/company_search/components/BlogProfile";
import ContactUs from "../pages/contact";
import HomePage from "../pages/home";
import JobSearchPage from "../pages/job_search";
import ServiceDetail from "../pages/serviceDetail/components/serviceDetail";
import ServiceStatus from "../pages/serviceStatus/components/serviceStstus";
import LocationPage from "../pages/location/components/location";
import LocationDetailPage from "../pages/loDetail/components/lomore";
import PaymentPage from "../pages/payment/components/paymemt";
import TermsAndPrivacyPage from "../pages/privacy/components";
import SettingsPage from "../pages/setting/components/setting";
import ProtectedRoute from "../components/ProtectRoute";
import ServiceLockRoute from "../components/ServiceLockRoute"; // Add this import

import {
  BLOG_PROFILE_PATH,
  COMMENT_PATH,
  CONTACT_US_PATH,
  HISTORY_PATH,
  HOME_PATH,
  PAYMENT_PATH,
  SERVICE_PATH,
  SERVICE_STATUS_PATH,
  SETTING_PATH,
  TERMS_PRIVACY_PATH,
  LOCATION_PATH,
  LOCATION_DETAIL_PATH,
} from "./path";
import { useRoutes } from "react-router-dom";

const RoutesComponent = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <ServiceLockRoute>
          <MainLayout />
        </ServiceLockRoute>
      ),
      children: [
        // Rest of your routes stay the same
        // Public routes - accessible to all users
        { path: HOME_PATH, element: <HomePage /> },
        { path: CONTACT_US_PATH, element: <ContactUs /> },
        { path: TERMS_PRIVACY_PATH, element:<TermsAndPrivacyPage /> },
        
        // Protected routes - only accessible to logged-in users
        { path: SERVICE_PATH, element: <ProtectedRoute><JobSearchPage /></ProtectedRoute> },
        { path: HISTORY_PATH, element: <ProtectedRoute><Company_searchPage /></ProtectedRoute> },
        { path: BLOG_PROFILE_PATH, element: <ProtectedRoute><BlogProfile /></ProtectedRoute> },
        { path: `${LOCATION_PATH}/:id`, element: <ProtectedRoute><LocationPage /></ProtectedRoute> },
        { path: `${LOCATION_DETAIL_PATH}/:id`, element: <ProtectedRoute><LocationDetailPage /></ProtectedRoute> },
        { path: `${PAYMENT_PATH}/:id`, element: <ProtectedRoute><PaymentPage /></ProtectedRoute> },
        { path: `${SERVICE_STATUS_PATH}/:id`, element: <ProtectedRoute><ServiceStatus /></ProtectedRoute> },
        { path: `${COMMENT_PATH}/:id`, element: <ProtectedRoute><CommentPage /></ProtectedRoute> },
        { path: COMMENT_PATH, element: <ProtectedRoute><CommentPage /></ProtectedRoute> },
        { path: SETTING_PATH, element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
        { path: "/service-detail/:id", element: <ProtectedRoute><ServiceDetail /></ProtectedRoute> },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};

export default RoutesComponent;