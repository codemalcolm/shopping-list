
import {
	Box,
	Container,
	Flex,
	Image,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
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

					<Box
						p={"8px"}
						borderRadius={"full"}
						border={"1px solid black"}
						bgColor={"gray.300"}
            ml={"150px"}
					>
						<Image alt="profile-nav-icon" />
					</Box>
				</Flex>
				<Box gap={16} display={{ base: "block", sm: "none" }}>
					<Image src={HamburgerIcon} alt="hamburger-nav-icon" />
				</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;

