import {
	Box,
	Flex,
	Image,
	Link,
	Text,
	Button,
	Input,
	Collapsible,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import deleteIcon from "./assets/icons/delete-icon.svg";
import editIcon from "./assets/icons/edit-icon.svg";
import saveIcon from "./assets/icons/save-icon.svg";
import showIcon from "./assets/icons/show-icon.svg";
import addUserIcon from "./assets/icons/add-user-icon.svg";
import addIcon from "./assets/icons/add-icon.svg";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "./components/ui/menu";
import {
	DialogRoot,
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./components/ui/dialog";
import { Field } from "./components/ui/field";
import { Avatar } from "./components/ui/avatar";
import { useNavigate } from "react-router";
import { useShoppingList } from "./context/ShoppingListContext";
import { Bookmark, CirclePlus, Eye, Trash2, UserRoundPlus } from "lucide-react";
import { useColorModeValue } from "./components/ui/color-mode";
import { useTranslation } from "react-i18next";


const App = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { shoppingList, setShoppingList, userList } = useShoppingList();
	const [showArchived, setShowArchived] = useState(false);

	const [inputs, setInputs] = useState({
		listName: "",
		membersList: [],
		itemList: [],
	});

	const [itemsFromInputs, setItemsFromInputs] = useState([]);

	const [addItem, setAddItem] = useState(false);
	const [fetchUsers, setFetchUsers] = useState(false);
	const [loggedUser, setlLoggedUser] = useState();

	// Testing purposes
	const handleUserChange = (index) => {
		setlLoggedUser(userList[index]);
	};


	useEffect(() => {
		setlLoggedUser(userList[0]);
	}, []);

	// add shopping list
	const handleAddShoppingList = (inputs, itemFromInputs) => {
		if (inputs.listName !== "") {
			const newShoppingList = {
				id: Math.random().toString(36).substr(2, 9), // Random id
				name: inputs.listName,
				state: "active",
				owner: loggedUser.id,
				memberList: inputs.membersList,
				itemList: [],
				isDone: false,
			};

			if (itemFromInputs) {
				itemFromInputs.forEach((item) => {
					const newItem = {
						id: item.id,
						name: item.itemName,
						quantity: item.quantity,
						isDone: false,
					};
					newShoppingList.itemList.push(newItem);
				});
			}
			setShoppingList((prevItemLists) => [...prevItemLists, newShoppingList]);

			return;
		}
	};

	// add item
	const handleAddItem = (itemId) => {
		const item = inputs.itemList.find((item) => item.id === itemId);
		const itemName = item ? item.itemName : null;
		const itemQuantity = item.quantity;

		const newItem = {
			id: itemId,
			itemName: itemName,
			quantity: itemQuantity,
			isDone: false,
			// append item to items array that will be later pushed into itemList array in shoppingList
		};
		setItemsFromInputs((prevItems) => [...prevItems, newItem]);
	};

	// add user
	const handleAddUser = (userId) => {
		setInputs((prevInputs) => ({
			...prevInputs,
			membersList: [...prevInputs.membersList, userId],
		}));
	};

	// add field input
	const handleAddInputFields = () => {
		const newInputField = {
			id: Math.random().toString(36).substr(2, 9), // Random id
			itemName: "",
			quantity: "",
		};

		setInputs((prevInputs) => ({
			...prevInputs,
			itemList: [...prevInputs.itemList, newInputField],
		}));
	};

	// input change of itemList in inputs
	const handleInputChange = (id, field, value) => {
		setInputs((prevInputs) => ({
			...prevInputs,
			itemList: prevInputs.itemList.map((item) =>
				item.id === id ? { ...item, [field]: value } : item
			),
		}));
	};
	console.log(inputs);

	// delete list - done
	const handleDeleteList = (listId) => {
		const deleteList = confirm("Do you want to delete this shopping list ?");
		if (deleteList) {
			setShoppingList((prevItemList) =>
				prevItemList.filter((item) => item.id !== listId)
			);
		}
	};

	// Navigate to list detail
	const handleShowListDetail = (id) => {
		navigate(`/list-detail/${id}`);
	};

	const handleFilter = () => {
		setShowArchived(!showArchived);
	};

	const handleArchiveList = (listId) => {
		setShoppingList((prevLists) =>
			prevLists.map((list) =>
				list.id === listId
					? { ...list, isArchived: !list.isArchived } // Toggle the list's `isArchived` property
					: list
			)
		);
	};

	const resetInputs = () => {
		setInputs({
			listName: "",
			membersList: [],
			itemList: [],
		});
		setItemsFromInputs([]);
	};

	return (
		<>
			{/* Testing */}
			<Box mb={"64px"}>
				<MenuRoot>
					<MenuTrigger asChild>
						<Button variant="outline" size="sm">
							<Text color={"red.500"}>Click me</Text> to change User
						</Button>
					</MenuTrigger>
					<MenuContent>
						{userList.map((user, index) => (
							<MenuItem
								value={user.id}
								key={user.id}
								bgColor={
									loggedUser?.id === user.id
										? "green.500"
										: useColorModeValue("white", "black")
								}
								color={loggedUser?.id === user.id ? "white" : "none"}
								onClick={() => {
									handleUserChange(index);
								}}
							>
								{user.name}
							</MenuItem>
						))}
					</MenuContent>
				</MenuRoot>
			</Box>

			{/* Flex */}
			<Flex gap={8} flexDirection={"column"}>
				<Flex
					justifyContent={"space-between"}
					alignItems={"center"}
					px={"16px"}
					flexDirection={{base:"column", md:"row"}}
					mb={{md:"none", base:"16px"}}
				>
					<Text fontSize={"18px"} fontWeight={500} display={{md:"block", base:"none"}}>
						{t("titles.mainPage")} :
					</Text>
					<Flex gap={2}>
						<Button
							width={"auto"}
							px={"32px"}
							bgColor={showArchived ? "green.500" : "white"}
							color={showArchived ? "white" : "black"}
							border={showArchived ? "none" : "1px solid black"}
							borderRadius={"16px"}
							onClick={() => handleFilter()}
						>
							{showArchived
								? t("buttonTexts.archiveButtonOff")
								: t("buttonTexts.archiveButton")}
						</Button>
						<DialogRoot
							onOpenChange={() => {
								setFetchUsers(false), setAddItem(false);
							}}
							onExitComplete={() => resetInputs()}
						>
							<DialogTrigger asChild>
								<Button
									borderRadius={"16px"}
									px={{ sm: "32px", base: "none" }}
									bgColor={{ base: "gray.900" }}
									color={{ base: "white" }}
									border={{ base: "1px solid black", _dark: "1px solid white" }}
								>
									<Text display={{ sm: "block", base: "none" }}>
										{t("buttonTexts.createButton")}
									</Text>
									<CirclePlus />
								</Button>
							</DialogTrigger>

							{/* Create shopping list modal */}
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										{t("buttonTexts.createShoppingList")}
									</DialogTitle>
								</DialogHeader>
								<DialogBody>
									<Flex gap={4} flexDirection={"column"} alignItems={"center"}>
										<Field
											label={t("titles.detailPage.itemName")}
											required
											w="81%"
										>
											<Input
												placeholder={t("placeholders.nameInput")}
												onChange={(e) =>
													setInputs({ ...inputs, listName: e.target.value })
												}
											/>
										</Field>
										<Collapsible.Root style={{ width: "100%" }}>
											<Flex flexDirection="column" alignItems="center" w="100%">
												<Collapsible.Trigger>
													{/* Opens users menu */}
													<Button
														w={"375px"}
														onClick={() => {
															setFetchUsers(!fetchUsers);
														}}
													>
														{t("buttonTexts.addUserLong")}
														<UserRoundPlus />
													</Button>
												</Collapsible.Trigger>

												<Collapsible.Content
													style={{
														display: "flex",
														justifyContent: "center",
														width: "100%",
														height: "100%",
													}}
												>
													<Flex
														padding="4"
														borderWidth="1px"
														w="375px"
														mt="4"
														justifyContent="center"
														flexDirection={"column"}
														gap={2}
													>
														{fetchUsers &&
															userList.map((user) => {
																const isAdded = inputs.membersList.includes(
																	user.id
																);
																if (user.id === loggedUser.id) return null; // Logged user not showing in the list
																return (
																	<Flex
																		key={user.id}
																		justifyContent={"space-between"}
																	>
																		<Flex gap={4} alignItems={"center"}>
																			<Avatar
																				src={user.profilePicUrl}
																				name={user.name}
																			/>
																			<Text>{user.name}</Text>
																		</Flex>
																		{/* Adds user */}
																		<Button
																			disabled={isAdded ? true : false}
																			bgColor={isAdded ? "green.500" : "none"}
																			onClick={() => {
																				handleAddUser(user.id);
																			}}
																		>
																			{isAdded
																				? t("buttonTexts.userAdded")
																				: t("buttonTexts.addUser")}
																		</Button>
																	</Flex>
																);
															})}
													</Flex>
												</Collapsible.Content>
											</Flex>
										</Collapsible.Root>
										<Collapsible.Root style={{ width: "100%" }}>
											<Flex flexDirection="column" alignItems="center" w="100%">
												<Collapsible.Trigger>
													<Button w={"375px"}>
														{t("buttonTexts.addItem")} <CirclePlus />
													</Button>
												</Collapsible.Trigger>

												<Collapsible.Content
													style={{
														display: "flex",
														justifyContent: "center",
														width: "100%",
														height: "100%",
													}}
												>
													<Flex
														padding="4"
														borderWidth="1px"
														w="375px"
														mt="4"
														justifyContent="center"
														alignItems={"center"}
														flexDirection={"column"}
														gap={2}
													>
														<Button
															borderRadius="full"
															p={0}
															onClick={() => {
																handleAddInputFields();
															}}
														>
															<CirclePlus />
														</Button>
														{inputs?.itemList?.map((item) => (
															<Flex gap={4} alignItems={"end"} key={item.id}>
																<Field
																	label={t("titles.detailPage.itemName")}
																	w={"35%"}
																>
																	<Input
																		onChange={(e) =>
																			handleInputChange(
																				item.id,
																				"itemName",
																				e.target.value
																			)
																		}
																	/>
																</Field>
																<Field
																	label={t("titles.detailPage.quantity")}
																	w={"35%"}
																>
																	<Input
																		onChange={(e) =>
																			handleInputChange(
																				item.id,
																				"quantity",
																				e.target.value
																			)
																		}
																	/>
																</Field>
																<Box w={"25%"}>
																	{item.itemName !== "" &&
																		item.quantity !== "" && (
																			<Button
																				onClick={() => handleAddItem(item.id)}
																			>
																				{t("buttonTexts.submit")}
																			</Button>
																		)}
																</Box>
															</Flex>
														))}
													</Flex>
												</Collapsible.Content>
											</Flex>
										</Collapsible.Root>
									</Flex>
								</DialogBody>
								<DialogFooter>
									<DialogActionTrigger asChild>
										<Button variant="outline">{t("buttonTexts.cancel")}</Button>
									</DialogActionTrigger>
									<DialogActionTrigger asChild>
										<Button
											onClick={() =>
												handleAddShoppingList(inputs, itemsFromInputs)
											}
										>
											{t("buttonTexts.submit")}
										</Button>
									</DialogActionTrigger>
								</DialogFooter>
								<DialogCloseTrigger />
							</DialogContent>
						</DialogRoot>
					</Flex>
					<Flex justifyContent={"start"} w="full">
						<Text fontSize={"18px"} fontWeight={500} display={{md:"none", base:"block"}} mt="16px">
							{t("titles.mainPage")} :
						</Text>
					</Flex>
				</Flex>
				{shoppingList
					?.filter(
						(item) =>
							// User must be a member or the owner
							(item.memberList.includes(loggedUser?.id) ||
								item.owner === loggedUser?.id) &&
							// Archived lists are shown only to owners of archived lists if showArchived is true
							((!item.isArchived && !showArchived) ||
								(item.isArchived &&
									loggedUser?.id === item.owner &&
									showArchived))
					)
					.map((item) => (
						<Box
							key={item.id}
							color={"text"}
							px={"32px"}
							py={"32px"}
							borderRadius={"8px"}
							bgColor={{ base: "gray.100", _dark: "gray.800" }}
						>
							<Flex justifyContent={"space-between"} alignItems={"center"}>
								<Flex gap={{md:"16px", base:"4px"}} alignItems={"center"} flexDirection={{md:"row", base:"column"}}>
									<Text>{item.name}</Text>
									<Flex gap={4} alignItems={"center"} justifyContent={"start"}>
										<Box w="4px" h="4px" borderRadius="full" bg={{base :"gray.800", _dark:"gray.400"}} />
										<Text fontSize={"10px"} fontWeight={600} color={{base :"gray.800", _dark:"gray.400"}}>{item.itemList.length}  {t("titles.itemsInList")}</Text>
									</Flex>
								</Flex>
								<Flex gap={{md:"16px", base:"8px"}} alignItems={"center"}>
									<Box
										onClick={() => handleShowListDetail(item.id)}
										variant="ghost"
										p={0}
										m={0}
										color={{ base: "black", _dark: "white" }}
										cursor="pointer"
									>
										<Eye />
									</Box>
									{loggedUser && (
										<>
											<Box
												display={
													loggedUser?.id === item.owner ? "block" : "none"
												}
												cursor="pointer"
												p={"2px"}
												color={{ base: "black", _dark: "white" }}
												onClick={() => {
													handleArchiveList(item.id);
												}}
												borderRadius={"full"}
											>
												<Bookmark
													fill={item.isArchived ? "#90ee90" : "transparent"}
													stroke={
														item.isArchived
															? "green.500"
															: useColorModeValue("black", "white")
													}
												/>
											</Box>
											<Box
												display={
													loggedUser?.id === item.owner ? "block" : "none"
												}
												color={{ base: "red", _dark: "red" }}
												cursor="pointer"
												onClick={() => {
													handleDeleteList(item.id);
												}}
											>
												<Trash2 />
											</Box>
										</>
									)}
								</Flex>
							</Flex>
						</Box>
					))}
			</Flex>
		</>
	);
};

export default App;
