import {
	Box,
	Button,
	Flex,
	Image,
	Text,
	Link,
	defineStyle,
} from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "./components/ui/avatar";
import editIcon from "./assets/icons/edit-icon.svg";
import deleteIcon from "./assets/icons/delete-icon.svg";
import closeIcon from "./assets/icons/close-icon.svg";
import ShoppingListItem from "./ShoppingListItem";
import { useEffect, useState } from "react";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "./components/ui/menu";

import { useNavigate, useParams } from "react-router-dom";
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
	DialogActionTrigger,
} from "./components/ui/dialog";
import { useShoppingList } from "./context/ShoppingListContext";
import {
	CirclePlus,
	Delete,
	List,
	ListChecks,
	PencilLine,
	Trash2,
	UserPlus,
	Users,
	X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	ProgressCircleRing,
	ProgressCircleRoot,
	ProgressCircleValueText,
} from "./components/ui/progress-circle";

const ShoppingListDetail = () => {
	const { t } = useTranslation();

	const { shoppingList, setShoppingList, userList } = useShoppingList();
	const [showFinishedItems, setShowFinishedItems] = useState(false);
	const [loggedUser, setLoggedUser] = useState(null);
	const [openedItemListDetail, setOpenedItemListDetail] = useState({
		id: "",
		name: "",
		state: "",
		owner: "",
		memberList: [],
		itemList: [],
		isDone: false,
		isArchived: false,
	});
	const [errorMessage, setErrorMessage] = useState("");
	const { shoppingListId } = useParams();

	// items in the opened shopping list
	const currentItems = openedItemListDetail.itemList;

	//calculate done percentage
	const calculateDonePercentage = (items) => {
		if (!items || items.length === 0) return 0; // Avoid division by zero

		const totalItems = items.length;
		const doneItems = items.filter((item) => item.isDone).length;

		return Math.round((doneItems / totalItems) * 100);
	};
	const donePercentage = calculateDonePercentage(currentItems);

	useEffect(() => {
		// Testing
		setLoggedUser(userList[0]);
		const selectedList = shoppingList.find(
			(list) => list.id === shoppingListId
		);
		setOpenedItemListDetail(selectedList);
	}, []);

	// Testing
	const handleUserChange = (index) => {
		setLoggedUser(userList[index]);
	};

	// Testing
	const handleListChange = (index) => {
		const selectedList = shoppingList[index];
		if (
			selectedList.memberList.includes(loggedUser.id) ||
			selectedList.owner === loggedUser.id
		) {
			setOpenedItemListDetail(selectedList);
			setErrorMessage("");
		} else {
			setOpenedItemListDetail(selectedList);
			setErrorMessage("You are not a member of this list.");
		}
	};

	// edit name - done
	const handleEdit = () => {
		const newName = prompt(
			"Enter new name for the shopping list:",
			openedItemListDetail.name
		);
		if (newName) {
			setShoppingList((prevList) =>
				prevList.map((list) =>
					list.id === openedItemListDetail.id
						? { ...list, name: newName }
						: list
				)
			);
			setOpenedItemListDetail((prev) => ({ ...prev, name: newName }));
		}
	};

	// list leaving - done
	const navigate = useNavigate();
	const handleLeave = () => {
		if (loggedUser) {
			setShoppingList((prevList) =>
				prevList.map((list) =>
					list.id === openedItemListDetail.id
						? {
								...list,
								memberList: list.memberList.filter(
									(member) => member !== loggedUser.id
								),
						  }
						: list
				)
			);
			alert(
				`${t("titles.detailPage.youHaveLeft")}: ${openedItemListDetail.name}`
			);
			navigate("/");
		}
	};

	// list delete - done
	const handleDeleteList = (listId) => {
		setShoppingList((prevList) =>
			prevList.filter((list) => list.id !== listId)
		);
		alert("List has been deleted");
		navigate("/");
	};

	// item add - done
	const handleAddItem = () => {
		const itemName = prompt(t("titles.detailPage.enterItemName"));
		const itemQuantity = prompt(t("titles.detailPage.enterItemQuantity"));

		if (itemName && itemQuantity) {
			const newItem = {
				id: Math.random().toString(36).substr(2, 9), // Random id
				name: itemName,
				quantity: parseInt(itemQuantity, 10),
				isDone: false,
			};

			setShoppingList((prevItems) =>
				prevItems.map((list) =>
					list.id === openedItemListDetail.id
						? { ...list, itemList: [...list.itemList, newItem] }
						: list
				)
			);

			setOpenedItemListDetail((prevDetail) => ({
				...prevDetail,
				itemList: [...prevDetail.itemList, newItem],
			}));
		}
	};

	// item delete - done
	const handleDeleteItem = (itemId) => {
		setShoppingList((prevItems) =>
			prevItems.map((list) =>
				list.id === openedItemListDetail.id
					? {
							...list,
							itemList: list.itemList.filter((item) => item.id !== itemId),
					  }
					: list
			)
		);

		setOpenedItemListDetail((prevDetail) => ({
			...prevDetail,
			itemList: prevDetail.itemList.filter((item) => item.id !== itemId),
		}));
	};

	// item finish - done
	const handleFinishItem = (itemId) => {
		setShoppingList((prevItems) =>
			prevItems.map((list) =>
				list.id === openedItemListDetail.id
					? {
							...list,
							itemList: list.itemList.map((item) =>
								item.id === itemId ? { ...item, isDone: !item.isDone } : item
							),
					  }
					: list
			)
		);

		setOpenedItemListDetail((prevDetail) => ({
			...prevDetail,
			itemList: prevDetail.itemList.map((item) =>
				item.id === itemId ? { ...item, isDone: !item.isDone } : item
			),
		}));
	};

	// filter
	const handleFilter = () => {
		setShowFinishedItems(!showFinishedItems);
	};

	// add user - done
	const handleAddUser = (userId) => {
		const updatedList = shoppingList.map((list) => {
			if (
				list.id === openedItemListDetail.id &&
				!list.memberList.includes(userId)
			) {
				return { ...list, memberList: [...list.memberList, userId] };
			}
			return list;
		});

		setShoppingList(updatedList);
		setOpenedItemListDetail((prev) => ({
			...prev,
			memberList: [...prev.memberList, userId],
		}));
	};

	// delete user - done
	const handleDeleteUser = (userId) => {
		const updatedList = shoppingList.map((list) => {
			if (list.id === openedItemListDetail.id) {
				return {
					...list,
					memberList: list.memberList.filter((member) => member !== userId),
				};
			}
			return list;
		});

		setShoppingList(updatedList);
		console.log("User deleted");
	};

	// members
	const currentList = shoppingList.find(
		(item) => item.id === openedItemListDetail.id
	);
	const currentListMembers = userList.filter(
		(user) =>
			currentList?.memberList.includes(user.id) ||
			user.id === currentList?.owner
	);

	// ring around owner avatar
	const ringCss = defineStyle({
		outlineWidth: "2px",
		outlineColor: "orange.500",
		outlineOffset: "2px",
		outlineStyle: "solid",
	});

	return (
		<>
			<Flex mb={"64px"} gap={4}>
				<MenuRoot>
					<MenuTrigger asChild>
						<Button variant="outline" size="sm">
							<Text color={"red.400"}>Click me</Text> to change User
						</Button>
					</MenuTrigger>
					<MenuContent>
						{userList.map((user, index) => (
							<MenuItem
								value={user.id}
								key={user.id}
								bgColor={
									loggedUser && loggedUser.id === user.id
										? "green.500"
										: "white"
								}
								color={
									loggedUser && loggedUser.id === user.id ? "white" : "none"
								}
								onClick={() => handleUserChange(index)}
							>
								{user.name}
							</MenuItem>
						))}
					</MenuContent>
				</MenuRoot>
			</Flex>
			<Flex
				width={"100%"}
				minW={"380px"}
				minH={"650px"}
				h="100%"
				bgColor={"gray.100"}
				mx={"auto"}
				borderRadius={"16px"}
				bg={{ base: "gray.100", _dark: "gray.800" }}
				gap="16px"
			>
				{errorMessage && (
					<Flex width="100%" justifyContent={"center"} alignItems={"center"}>
						<Text color="red.500" textAlign="center" mb={4} fontSize={"32px"}>
							{errorMessage}
						</Text>
					</Flex>
				)}
				{!errorMessage && (
					<Flex padding={"18px"} width={"100%"} flexDirection={"column"}>
						<Flex justifyContent={"space-between"}>
							<Flex gap={2}>
								<Box>
									{!errorMessage && loggedUser && (
										<>
											{loggedUser?.id === openedItemListDetail?.owner ? (
												<Box
													cursor="pointer"
													t
													onClick={() =>
														handleDeleteList(openedItemListDetail.id)
													}
													color="red"
												>
													<Trash2 />
												</Box>
											) : (
												<Text
													cursor="pointer"
													color={"red.500"}
													onClick={() => {
														handleLeave();
													}}
												>
													{t("buttonTexts.leave")}
												</Text>
											)}
										</>
									)}
								</Box>
								<Box
									display={
										loggedUser?.id === openedItemListDetail?.owner
											? "block"
											: "none"
									}
									cursor="pointer"
									onClick={() => {
										handleEdit();
									}}
								>
									<PencilLine />
								</Box>
							</Flex>
							<Box onClick={() => navigate("/")} cursor={"pointer"}>
								<X />
							</Box>
						</Flex>

						{!errorMessage && openedItemListDetail && (
							<Flex
								key={openedItemListDetail.id}
								justifyContent={"center"}
								flexDirection={"column"}
								width={{sm:"60%", base:"80%"}}
								mx={"auto"}
								mb={"16px"}
								gap="16px"
							>
								<Text mx={"auto"} fontSize={{ base: "28px", sm: "36px" }}>
									{openedItemListDetail.name}
								</Text>
								<Flex justifyContent={"space-between"}>
									<ProgressCircleRoot
										value={donePercentage}
										size={"md"}
										colorPalette={"green"}
									>
										<ProgressCircleValueText />
										<ProgressCircleRing />
									</ProgressCircleRoot>
									<Flex gap={2} alignItems={"center"}>
										<Button
											width={"auto"}
											px={"32px"}
											bgColor={showFinishedItems ? "green.500" : "white"}
											color={showFinishedItems ? "white" : "black"}
											border={showFinishedItems ? "none" : "1px solid black"}
											borderRadius={"16px"}
											onClick={() => handleFilter()}
											display={{ base: "none", sm: "block" }}
										>
											{showFinishedItems
												? t("buttonTexts.showFinishedOff")
												: t("buttonTexts.showFinished")}
										</Button>
										<Button
											bgColor={showFinishedItems ? "green.500" : "white"}
											color={showFinishedItems ? "white" : "black"}
											border={showFinishedItems ? "none" : "1px solid black"}
											borderRadius={"16px"}
											onClick={() => handleFilter()}
											display={{ base: "block", sm: "none" }}
										>
											{showFinishedItems ? <List /> : <ListChecks />}
										</Button>
										<Button
											px={{ base: "0", sm: "32px" }}
											borderRadius={"16px"}
											onClick={() => {
												handleAddItem();
											}}
										>
											<Text display={{ base: "none", sm: "block" }}>
												{t("buttonTexts.addItem")}
											</Text>
											<CirclePlus />
										</Button>
									</Flex>
								</Flex>
								<Flex
									flexDirection={"column"}
									gap={4}
									mt={"16px"}
									maxWidth={"800px"}
								>
									<Text
										lineHeight={"24px"}
										height={"24px"}
										my={"auto"}
										fontSize={"24px"}
									>
										{t("titles.detailPage.items")} :
									</Text>
									<Flex justifyContent={"space-between"} width={"55%"} px={{sm:"24px", base:"8px"}}>
										<Text fontWeight={500}>
											{t("titles.detailPage.itemName")}
										</Text>
										<Text fontWeight={500}>
											{t("titles.detailPage.quantity")}
										</Text>
									</Flex>
									{currentItems
										?.filter((item) => showFinishedItems || !item.isDone)
										.map((item) => (
											<ShoppingListItem
												key={item.id}
												name={item.name}
												quantity={item.quantity}
												isDone={item.isDone}
												onFinish={() => handleFinishItem(item.id)}
												onDelete={() => handleDeleteItem(item.id)}
											/>
										))}
								</Flex>
							</Flex>
						)}
						<Flex
							borderTop={"1px solid black"}
							mt={"auto"}
							padding={"28px"}
							justifyContent={"space-between"}
							alignItems={"center"}
							display={errorMessage ? "none" : "flex"}
						>
							<Flex gap={4} alignItems={"center"}>
								<Text fontSize={"1.2vw"} fontWeight={500}>
									{t("titles.detailPage.usersInList")} :
								</Text>
								<AvatarGroup size="lg">
									{currentListMembers.map((user) => {
										const isOwner = user.id === currentList?.owner;

										return (
											<Avatar
												key={user.id}
												src={user.profilePicUrl}
												name={user.name}
												css={isOwner ? ringCss : "none"}
											/>
										);
									})}
									{/* fallback */}
									{currentListMembers.length > 3 && (
										<Avatar
											variant="solid"
											name={`+${currentListMembers.length - 3}`}
										/>
									)}
								</AvatarGroup>
							</Flex>
							<DialogRoot size={"md"}>
								<DialogTrigger asChild>
									<Button
										px={"32px"}
										borderRadius={"16px"}
										fontSize={"1em"}
										display={{ base: "none", sm: "block" }}
									>
										{loggedUser?.id === currentList?.owner
											? t("buttonTexts.addUserOwner")
											: t("buttonTexts.addUserMember")}
									</Button>
								</DialogTrigger>
								<DialogTrigger asChild>
									<Button
										px={"32px"}
										borderRadius={"16px"}
										fontSize={"1em"}
										display={{ base: "block", sm: "none" }}
									>
										{loggedUser?.id === currentList?.owner ? (
											<UserPlus />
										) : (
											<Users />
										)}
									</Button>
								</DialogTrigger>

								<DialogContent>
									<DialogHeader>
										<DialogTitle>{t("titles.detailPage.users")}</DialogTitle>
									</DialogHeader>

									<DialogBody>
										<Flex flexDirection={"column"} gap={4}>
											{userList
												.filter(
													(user) =>
														loggedUser?.id === currentList?.owner || // owner sees all users in the app
														currentList?.memberList.includes(user.id) || // member sees only members
														user.id === currentList?.owner // members see owner
												)
												.map((user) => {
													const isAdded = currentList?.memberList.includes(
														user.id
													);
													const isOwner = user.id === currentList?.owner;

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

															{isOwner ? (
																<Text
																	lineHeight="18px"
																	height="18px"
																	fontSize="18px"
																	color="orange.400"
																	alignSelf="center"
																>
																	{t("titles.detailPage.owner")}
																</Text>
															) : (
																loggedUser?.id === currentList?.owner && ( // add/remove buttons for owner
																	<Button
																		bgColor={isAdded ? "red.500" : "green.500"}
																		onClick={() => {
																			if (isAdded) {
																				handleDeleteUser(user.id);
																			} else {
																				handleAddUser(user.id);
																			}
																		}}
																	>
																		{isAdded
																			? t("buttonTexts.removeUser")
																			: t("buttonTexts.addUser")}
																	</Button>
																)
															)}
														</Flex>
													);
												})}
										</Flex>
									</DialogBody>
								</DialogContent>
							</DialogRoot>
						</Flex>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default ShoppingListDetail;
