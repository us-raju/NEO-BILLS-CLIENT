import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import Bills from "../Pages/Bills";
import BillsDetails from "../Pages/BillsDetails";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyPayBills from "../Pages/MyPayBills";
import PrivateRoute from "../Provider/PrivateRoute";
import Page404 from "../Pages/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      { index: true, element: <Home></Home> },
      {
        path: "/bills",
        element: (
          <PrivateRoute>
            <Bills></Bills>
          </PrivateRoute>
        ),
      },
      {
        path: "/bills-details/:id",
        element: (
          <PrivateRoute>
            <BillsDetails></BillsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/paybills",
        element: (
          <PrivateRoute>
            <MyPayBills></MyPayBills>
          </PrivateRoute>
        ),
      },
      { path: "/register", element: <Register></Register> },
      { path: "/login", element: <Login></Login> },
      {
        path: "/*",
        element: <Page404></Page404>,
      },
    ],
  },
]);

export default router;
