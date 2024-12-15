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
import englishFlag from "./assets/icons/english-flag-icon.svg";
import czechFlag from "./assets/icons/czech-republic-flag-icon.svg";
import {
	MenuContent,
	MenuItem,
	MenuItemCommand,
	MenuRoot,
	MenuTrigger,
} from "./components/ui/menu";
import { useTranslation } from "react-i18next";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const lngs = {
		en: { nativeName: "English", flag: englishFlag },
		cz: { nativeName: "Czech", flag: czechFlag },
	};

	const { t, i18n } = useTranslation();
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
					<MenuRoot>
						<MenuTrigger asChild>
							<Button variant="outline" size="xs">
								LANG
							</Button>
						</MenuTrigger>
						<MenuContent minWidth={"55px"}>
							<Flex
								justifyConten="center"
								flexDir="column"
								alignItems={"center"}
							>
								{Object.keys(lngs).map((lng, index) => (
									<Flex
										key={index}
										value="new-txt-a"
										type="submit"
										onClick={() => i18n.changeLanguage(lng)}
										fontWeight={
											i18n.resolvedLanguage === lng ? "bold" : "normal"
										}
										backgroundColor={
											i18n.resolvedLanguage === lng ? "green.500" : "default"
										}
										justifyContent={"center"}
										alignItems={"center"}
										width={"auto"}
										px={"20px"}
										py={"12px"}
										gap={"8px"}
									>
										{lngs[lng].nativeName}
										<Image src={lngs[lng].flag} width={"25px"} />
									</Flex>
								))}
							</Flex>
						</MenuContent>
					</MenuRoot>
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
						<DrawerHeader></DrawerHeader>
						<DrawerBody p="0">
							<VStack justifyContent={"start"} alignItems={"start"} w="100%">
								<HStack
									borderBottom="1px solid white"
									w="100%"
									p="16px"
									justifyContent={"space-between"}
								>
									<Text>Appearance</Text>
									<ColorModeButton borderRadius={"full"} />
								</HStack>
								<HStack
									borderBottom="1px solid white"
									w="100%"
									p="16px"
									justifyContent={"space-between"}
								>
									<Text>Language</Text>
									<Flex
										justifyConten="center"
										flexDir="column"
										alignItems={"center"}
										zIndex={"1009"}
									>
										{Object.keys(lngs).map((lng, index) => (
											<Flex
												key={index}
												value="new-txt-a"
												type="submit"
												onClick={() => i18n.changeLanguage(lng)}
												fontWeight={
													i18n.resolvedLanguage === lng ? "bold" : "normal"
												}
												backgroundColor={
													i18n.resolvedLanguage === lng
														? "green.500"
														: "default"
												}
												justifyContent={"center"}
												alignItems={"center"}
												width={"auto"}
												px={"20px"}
												py={"12px"}
												gap={"8px"}
											>
												{lngs[lng].nativeName}
												<Image src={lngs[lng].flag} width={"25px"} />
											</Flex>
										))}
									</Flex>
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
