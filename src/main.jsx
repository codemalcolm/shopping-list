import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { defaultSystem } from "@chakra-ui/react"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider value={defaultSystem}>
			<App />
		</Provider>
	</StrictMode>
);
