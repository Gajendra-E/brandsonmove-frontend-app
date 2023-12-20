// icons
/*
import DashboardIcon from "../assets/icons/closemenu.svg";
import HomeIcon from "../assets/icons/closemenu.svg";
import UserIcon from "../assets/icons/closemenu.svg";

export const PATHS = {
  base: "/",
  orders: "/main/orders",
  products: "/main/products",
  commerce: "/main/commerce",
  dashboard: "/main/dashboard",
};

interface TabProps {
  label: string;
  href: string;
  icon: string;
}

export const BOTTOM_NAV_TABS: TabProps[] = [
  { label: "Orders", href: PATHS.orders, icon: HomeIcon },
  { label: "Products", href: PATHS.products, icon: DashboardIcon },
  { label: "Commerce", href: PATHS.commerce, icon: UserIcon },
  { label: "Dashboard", href: PATHS.dashboard, icon: UserIcon },
];

*/

export const APP_CONFIG = {
  NAME: "KR4ALL",
  HUSURA_ADMIN_SECRET: "jVSLGWmPT5QpFx9JLZTo62stKwCXX2m24fCEzkGdsm4SbGrLa3PBgyTSc7uF6oS9",
  // RAZORPAYKEY_TEST: "rzp_test_4VNGs8GjqQvx7P",
  // RAZORPAYKEY_LIVE: "rzp_live_0OhhivD3EhzTFM",
  SUPPORT_NUMBER: "+917702086555",
  SUREPASS_API_BASE_URL:"https://kyc-api.aadhaarkyc.io/api/v1/",
  // API_BASE_URL: "http://localhost:3000/api",
  API_BASE_URL: "https://brandsonmove-server.onrender.com/api",
  SUREPASS_APIS_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MTIxNDczNSwianRpIjoiMmE4MWZkMTUtNWU0Yy00NjY1LWE0NTItYTE4ZDRmZTRkOTdkIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmtyNGFsbEBhYWRoYWFyYXBpLmlvIiwibmJmIjoxNjQxMjE0NzM1LCJleHAiOjE5NTY1NzQ3MzUsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJyZWFkIl19fQ.xq-191hmb69EjYkJ5r4c2yAJNf2lMqnA_3PhfnCrzNY",
  ...process.env,
};

export const QR_CODE_BASE_URL = "https://app.kr4all.com/pharmacy/details?id=";

export const CC_EMAILS = [
  "rayapu00@rediffmail.com",
  "rayikaur@rediffmail.com"
];
