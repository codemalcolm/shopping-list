import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { defaultSystem } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import ShoppingListDetail from "./ShoppingListDetail.jsx";
import { ShoppingListProvider } from "./context/ShoppingListContext.jsx";
import theme from "../theme.js";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";
import "./i18n.js"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		// loader: rootLoader,
		children: [
			{
				path: "/",
				element: <App />,
				// loader: teamLoader,
			},
			{
				path: "list-detail",
				// loader: teamLoader,
				children: [
					{
						path: ":shoppingListId",
						element: <ShoppingListDetail />,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider value={theme}>
			<ColorModeProvider>
				<ShoppingListProvider>
					<RouterProvider router={router} />
				</ShoppingListProvider>
			</ColorModeProvider>
		</Provider>
	</StrictMode>
);
