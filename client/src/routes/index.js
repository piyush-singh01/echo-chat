// React Imports
import { Suspense, lazy } from "react"; // Suspense and lazy for lazy loading
import { Navigate, useRoutes } from "react-router-dom";
// LAYOUTS
import DashboardLayout from "../layouts/app";
import AuthLayout from "../layouts/auth";
// CONFIG
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/misc/LoadingScreen";

// Lazy Loading
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const GeneralApp = Loadable(lazy(() => import("../pages/app/GeneralApp")));

// Auth Pages
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ForgotPasswordPage = Loadable(lazy(() => import("../pages/auth/ForgotPassword")));
const ResetPasswordPage = Loadable(lazy(() => import("../pages/auth/ResetPassword")));
const Verify = Loadable(lazy(() => import("../pages/auth/Verify")));

// User Pages
const GroupPage = Loadable(lazy(() => import("../pages/app/Group")));
const ProfilePage = Loadable(lazy(() => import("../pages/app/Profile")));
const Settings = Loadable(lazy(() => import("../pages/app/Settings")));
const CallPage = Loadable(lazy(() => import("../pages/app/Call")));

// 404 Page
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "verify", element: <Verify /> },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true }, // default

        // Routes for conversations
        { path: "app", element: <GeneralApp /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },

        // Routes for settings
        { path: "settings", element: <Settings /> },
        { path: "profile", element: <ProfilePage /> },

        // 404 Routes
        { path: "404", element: <Page404 /> }, // '/404'
        { path: "*", element: <Navigate to='/404' replace /> }, // go to 404 if any other
      ],
    },
    { path: "*", element: <Navigate to='/404' replace /> },
  ]);
}
