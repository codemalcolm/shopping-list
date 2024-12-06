import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	Image,
	Input,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Avatar } from "./components/ui/avatar";
import React, { useState } from "react";
import HamburgerIcon from "./assets/icons/burger-icon.svg";
import moonIcon from "./assets/icons/moon-icon.svg";
import sunIcon from "./assets/icons/sun-icon.svg";
import { ColorModeButton } from "./components/ui/color-mode";
import { AlignRight } from "lucide-react";
import {
	DrawerActionTrigger,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerRoot,
	DrawerTitle,
	DrawerTrigger,
} from "./components/ui/drawer";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	return (
		<Box
			px={{ base: "32px", sm: "48px" }}
			py={{ base: "32px", sm: "32px" }}
			w={"full"}
			bgColor={{ base: "white", _dark: "gray.900" }}
			borderBottom={{ base: "1px solid gray", _dark: "1px solid white" }}
			color={"text"}
		>
			<Flex justifyContent={"space-between"} alignItems={"center"} gap={"48px"}>
				<Link href="/">Shopping List</Link>
				<Flex
					gap={8}
					display={{ base: "none", sm: "flex" }}
					alignItems={"center"}
					height={"32px"}
				>
					<ColorModeButton borderRadius={"full"} />
					<Avatar size="xl" name="Sage" src="https://bit.ly/sage-adebayo" />
				</Flex>
				<DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
					<DrawerBackdrop />
					<DrawerTrigger asChild>
						<Box gap={16} display={{ base: "block", sm: "none" }}>
							<AlignRight />
						</Box>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
						</DrawerHeader>
						<DrawerBody p="0">
						<VStack justifyContent={"start"} alignItems={"start"} w="100%">
							<HStack borderBottom="1px solid white" w="100%" p="16px" justifyContent={"space-between"}>
								<Text>Appearance</Text>
								<ColorModeButton borderRadius={"full"} />
							</HStack>
							<HStack borderBottom="1px solid white" w="100%" p="16px" justifyContent={"space-between"}>
								<Text>Language</Text>
								Language icon
							</HStack>
						</VStack>
						</DrawerBody>
						<DrawerCloseTrigger />
					</DrawerContent>
				</DrawerRoot>
			</Flex>
		</Box>
	);
};

export default Navbar;
