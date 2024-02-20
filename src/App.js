import React, { Fragment, useEffect} from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Base from "./components/Base";
import UserHome from "./pages/User/Index";
import AdminHome from "./pages/Admin/Index";
import userData from "./userData.json";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { initializeBookings } from "./store/bookingSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "user",
    element: (
      <ProtectedRoute>
        <Base />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <UserHome />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <Base />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    const bookings = localStorage.getItem("bookings");
    if (bookings) {
      dispatch(initializeBookings(JSON.parse(bookings)));
    }
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
