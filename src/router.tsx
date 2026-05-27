import { createBrowserRouter } from "react-router";

import App from "@/App";
import AssignmentBriefPage from "@/pages/assignmentBrief/AssignmentBriefPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import ProductPage from "@/pages/product/ProductPage";
import CartPage from "@/pages/cart/CartPage";

const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AssignmentBriefPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "product/:id",
        element: <ProductPage/>
      },
      {
        path: "cart",
        element: <CartPage/>
      },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);