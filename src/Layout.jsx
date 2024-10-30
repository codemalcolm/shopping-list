import { Box, Link } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<Box>
			{/* !!! Navbar logic missing !!! */}
			<Navbar />

			{/* For all the other pages */}
			<Box
				flex={1}
				w={"calc(100% - 250px)"}
				h={"100%"}
				mt={"60px"}
				mx={"auto"}
			>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;