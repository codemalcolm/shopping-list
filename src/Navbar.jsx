import {
	Box,
	Button,
	Container,
	Flex,
	Image,
	Input,
	Link,
	Text,
} from "@chakra-ui/react";
import { Avatar } from "./components/ui/avatar";
import React, { useState } from "react";
import HamburgerIcon from "./assets/icons/burger-icon.svg";
import moonIcon from "./assets/icons/moon-icon.svg";
import sunIcon from "./assets/icons/sun-icon.svg";

const Navbar = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	return (
		<Box
			px={{ base: "32px", sm: "48px" }}
			py={{ base: "32px", sm: "32px" }}
			border={"1px solid black"}
			w={"full"}
		>
			<Flex justifyContent={"space-between"} alignItems={"center"} gap={"48px"}>
				<Link href="/">Shopping List</Link>
				<Flex
					gap={8}
					display={{ base: "none", sm: "flex" }}
					alignItems={"center"}
					height={"32px"}
				>
					<Button
						p={0}
						w={"40px"}
						h={"40px"}
						variant="ghost"
						onClick={() => setIsDarkMode(!isDarkMode)}
						borderRadius={"full"}
					>
						<Image objectFit="cover" src={isDarkMode ? sunIcon : moonIcon}/>
					</Button>
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
