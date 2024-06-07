import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter ,Outlet,RouterProvider } from "react-router-dom";
import ErrorComponent from './components/ErrorComponent';
import SideNav from "./components/SideNav";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import useOnlineStatus from "./common/utils/useOnlineStatus";
import './../styles/theme.scss';

const AppLayout = () => {
  const onlineStatus=useOnlineStatus();
  if(!onlineStatus){
    return (<div>Looks Like you are offline</div>)
  }
  return (
    <div className="container">
    <SideNav />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
  );
};

const appRouter=createBrowserRouter([
  {
    path:"/",
    element: <AppLayout/>,
    errorElement:<ErrorComponent/>,
    children:[
      {
        path:"/",
        element: <Home/>,
        errorElement:<ErrorComponent/>,
      },
      {
        path: "/userDetails/:id", // Dynamic route for user details
        element: <UserDetails/>,
        errorElement:<ErrorComponent/>,
      }
    ]
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
