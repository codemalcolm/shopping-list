
import {
	Box,
	Container,
	Flex,
	Image,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import {Avatar} from "./components/ui/avatar"
import React from "react";
import HamburgerIcon from "./assets/icons/burger-icon.svg"
// import ProfileIcon from "../icons/profile-icon.svg";

const Navbar = () => {

	return (
		<Box
			px={{ base: "32px", sm: "48px" }}
			py={{ base: "32px", sm: "32px" }}
			border={"1px solid black"}
			w={"full"}
		>
			<Flex justifyContent={"space-between"} alignItems={"center"} gap={"48px"}>
				<Box>Name</Box>
				<Flex
					gap={8}
					display={{ base: "none", sm: "flex" }}
					alignItems={"center"}
					height={"32px"}
				>
					<Avatar size="xl" name="Sage" src="https://bit.ly/sage-adebayo" />
				</Flex>
				<Box gap={16} display={{ base: "block", sm: "none" }}>
					<Image src={HamburgerIcon} alt="hamburger-nav-icon" />
				</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;

