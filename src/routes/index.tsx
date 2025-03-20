import MainLayout from "../layout";
import NotFoundPage from "../pages/404";
import CommentPage from "../pages/comment/components/comment";
import Company_searchPage from "../pages/company_search";
import BlogProfile from "../pages/company_search/components/BlogProfile";
import ContactUs from "../pages/contact";
import HomePage from "../pages/home";
import JobSearchPage from "../pages/job_search";
import ServiceDetail from "../pages/job_search/components/serviceDetail";
import ServiceStatus from "../pages/job_search/components/serviceStstus";
import LocationPage from "../pages/location/components/location";
import LocationDetailPage from "../pages/loDetail/components/lomore";
import PaymentPage from "../pages/payment/components/paymemt";

import {
  BLOG_PROFILE_PATH,
  COMMENT_PATH,
  CONTACT_US_PATH,
  HISTORY_PATH,
  HOME_PATH,
  LOCATION_DETAIL_PATH,
  LOCATION_PATH,
  PAYMENT_PATH,
  SERVICE_PATH,
  SERVICE_STATUS_PATH,
} from "./path";
import { useRoutes } from "react-router-dom";

const RoutesComponent = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: HOME_PATH, element: <HomePage /> },
        { path: SERVICE_PATH, element: <JobSearchPage /> },
        { path: HISTORY_PATH, element: <Company_searchPage /> },
        { path: BLOG_PROFILE_PATH, element: <BlogProfile /> },
        { path: CONTACT_US_PATH, element: <ContactUs/> },
        { path: LOCATION_PATH, element: <LocationPage/> },
        { path: LOCATION_DETAIL_PATH, element: <LocationDetailPage/> },
        { path: PAYMENT_PATH, element: <PaymentPage/> },
        { path: SERVICE_STATUS_PATH, element: <ServiceStatus/> },
        { path: COMMENT_PATH, element: <CommentPage/> },
        { path: "/service-detail/:id", element: <ServiceDetail/>},

      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};

export default RoutesComponent;
