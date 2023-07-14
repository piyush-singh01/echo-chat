import { Suspense, lazy } from "react"; // Suspense and lazy for lazy loading
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import LoginPage from "../pages/auth/Login";
import { Outlet } from "react-router-dom";

import MainLayout from "../layouts/main";
import RegisterPage from "../pages/auth/Register";

// This loadable is essentially a wrapper, which accepts a component.
// Normally const SomeComponent = lazy(load)
// THis someComponent is then wrapped around suspense, which is what we are doing with the Loadable function
const Loadable = (Component) => (props) => {
  //Wrap it around Suspense, which excepts a fallback prop.
  return (
    <Suspense fallback={<LoadingScreen />}>
      {" "}
      {/* fallback till the original component is loading */}
      <Component {...props} /> {/*The original Component (children)*/}
    </Suspense>
  );
};

export default function Router() {
  // This useRoute hook is the functional equivalent of <Routes> but uses javascript objects instead.
  // Takes in an array of routes. See below
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },

    {
      path: "/",
      element: <DashboardLayout />,
      //The rendered children will be wrapped inside the parent element, that is the dashboard layout here.
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true }, // refirects to /app. This is an indexed route, it doesn't have a path. Renders by default for '/' (in this case it redirects to '/app'). See index routes for more details. Since
        { path: "app", element: <GeneralApp /> }, // '/app'

        // Add path for settings
        { path: "settings", element: <Settings /> },

        { path: "404", element: <Page404 /> }, // '/404'
        { path: "*", element: <Navigate to="/404" replace /> }, // go to 404 if any other
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> }, // Navigate: see below
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")) // lazy import : lazy lets you defer loading component’s code until it is rendered for the first time.
);

// const LoginPage = Loadable(lazy(() => import("../pages/dashboard/LoginPage")));

const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

/*

Same thing using Routes component and useRoutes hook


<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route
      path="messages"
      element={<DashboardMessages />}
    />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>




  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);









ABOUT NAVIGATE

<Navigate> is a wrapper over the useNavigate hook. Very similar to Link. The useNavigate hook is only valid inside a BrowserRouter

<Link> actually replaces with an anchor tag and an href

useNavigate is the same as Link, but can navigate between routes, programatically, like on submitting a form, we can configure it to navigate.
 let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    await submitForm(event.target);
    navigate("/success", { replace: true });
  }
  return <form onSubmit={handleSubmit}></form>;

    Link is just an anchor tag


*/
