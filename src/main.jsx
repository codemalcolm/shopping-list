import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { defaultSystem } from "@chakra-ui/react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root.jsx";
import ShoppingListDetail from "./ShoppingListDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // loader: rootLoader,
    children: [
      {
        path: "list-detail",
        element: <ShoppingListDetail />,
        // loader: teamLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider value={defaultSystem}>
      <RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
