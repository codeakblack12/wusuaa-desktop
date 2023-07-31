import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './screens/auth/login';
import ForgotPassword from './screens/auth/forgot-password';
import ResetPassword from './screens/auth/reset-password';
import Otp from './screens/auth/otp';
import ResetSuccess from './screens/auth/reset-success';
import Dashboard from './screens/main';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from './screens/auth/landing';

export const ROUTES = [
  // {
  //   path: "/",
  //   element: <App />,
  // },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-success",
    element: <ResetSuccess />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }].concat(ROUTES));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
