import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import Bills from "../Pages/Bills";
import BillsDetails from "../Pages/BillsDetails";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyPayBills from "../Pages/MyPayBills";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
      {index:true, element:<Home></Home>},
      {path:"/bills", element:<Bills></Bills>},
      {path:"/bills-details", element:<BillsDetails></BillsDetails>},
      {path:"/paybills", element:<MyPayBills></MyPayBills>},
      {path:"/register", element:<Register></Register>},
      {path:"/login", element:<Login></Login>},
    ]
  },
]);

export default router;
