import { Box, Button, Flex, Image, Text, Link, defineStyle } from "@chakra-ui/react";
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

import { useNavigate } from "react-router-dom";
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
  } from "./components/ui/dialog"

const ShoppingListDetail = () => {
	
	const [showFinishedItems, setShowFinishedItems] = useState(false);
	const [loggedUser, setLoggedUser] = useState(null);
	const [openedItemListDetail, setOpenedItemListDetail] = useState({ id: "", name: "", state: "", memberList: [], isDone: false });
	const [errorMessage, setErrorMessage] = useState("");

	const [items, setItems] = useState([
		{
			id: "1",
			name: "Apples",
			quantity: 5,
			shoppingListId: "td01",
			isDone: false,
		},
		{
			id: "2",
			name: "Bananas",
			quantity: 6,
			shoppingListId: "td01",
			isDone: true,
		},
		{
			id: "3",
			name: "Milk",
			quantity: 1,
			shoppingListId: "td02",
			isDone: false,
		},
		{
			id: "4",
			name: "Bread",
			quantity: 2,
			shoppingListId: "td03",
			isDone: true,
		},
		{
			id: "5",
			name: "Eggs",
			quantity: 12,
			shoppingListId: "td04",
			isDone: false,
		},
	]);

	const [itemList, setItemList] = useState([
		{
			id: "td01",
			name: "První úkolovník",
			state: "active",
			owner: "u1",
			memberList: ["u2", "u3"],
			isDone: false,
		},
		{
			id: "td02",
			name: "Druhý úkolovník",
			state: "archived",
			owner: "u2",
			memberList: ["u3"],
			isDone: true,
		},
		{
			id: "td03",
			name: "Třetí úkolovník",
			state: "active",
			owner: "u3",
			memberList: ["u1"],
			isDone: false,
		},
		{
			id: "td04",
			name: "čtvrtý úkolovník",
			state: "archived",
			owner: "u1",
			memberList: [],
			isDone: true,
		},
	]);

	const userList = [
		{ id: "u1", name: "vochomůrka", profilePicUrl: "https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" },
		{ id: "u2", name: "křemílek", profilePicUrl: "https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" },
		{ id: "u3", name: "rákosníček", profilePicUrl: "https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863"},
	];

	// Testing
	const handleUserChange = (index) => {
		setLoggedUser(userList[index]);
	};

	const handleListChange = (index) => {
		const selectedList = itemList[index];
		if (selectedList.memberList.includes(loggedUser.id) || selectedList.owner === loggedUser.id) {
			setOpenedItemListDetail(selectedList);
			setErrorMessage("");
		} else {
			setOpenedItemListDetail(selectedList);
			setErrorMessage("You are not a member of this list.");
		}
	};

	useEffect(() => {
		// Testing
		setLoggedUser(userList[0]);
		setOpenedItemListDetail(itemList[0]);
	}, []);

	// edit name - done
	const handleEdit = () => {
		const newName = prompt("Enter new name for the shopping list:", openedItemListDetail.name);
		if (newName) {
		  setItemList(prevList =>
			prevList.map(list =>
			  list.id === openedItemListDetail.id ? { ...list, name: newName } : list
			)
		  );
		  setOpenedItemListDetail(prev => ({ ...prev, name: newName }));
		}
	  };

	// list leaving - done
	const navigate = useNavigate();
	const handleLeave = () => {
		if (loggedUser) {
			setItemList((prevList) =>
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
			alert(`You have left the shopping list: ${openedItemListDetail.name}`);
			navigate("/")
		}
	};

	// item add - done
	const handleAddItem = () => {
		const itemName = prompt("Enter item name:");
		const itemQuantity = prompt("Enter item quantity:");
	  
		if (itemName && itemQuantity) {
		  const newItem = {
			id: Math.random().toString(36).substr(2, 9), // Random id
			name: itemName,
			quantity: parseInt(itemQuantity, 10),
			shoppingListId: openedItemListDetail.id,
			isDone: false,
		  };

		  setItems(prevItems => [...prevItems, newItem]);
		}
	};

	// item delete - done
	const handleDeleteItem = (itemId) => {
		setItems(prevItems => prevItems.filter(item => item.id !== itemId));
	};

	// item - done
	const handleFinishItem = (itemId) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, isDone: !item.isDone } : item
			)
		);
	};

	// filter - done
	const handleFilter = () => {
		setShowFinishedItems(!showFinishedItems);
	};

	// add user - done
	const handleAddUser = (userId) => {

		const updatedList = itemList.map((list) => {
			if (list.id === openedItemListDetail.id && !list.memberList.includes(userId)) {
				return { ...list, memberList: [...list.memberList, userId] };
			}
			return list;
		});
	
		setItemList(updatedList);
		setOpenedItemListDetail((prev) => ({
			...prev,
			memberList: [...prev.memberList, userId],
		}));
	};

	// delete user - done
	const handleDeleteUser = (userId) => {

		const updatedList = itemList.map((list) => {
			if (list.id === openedItemListDetail.id) {
				return {
					...list,
					memberList: list.memberList.filter((member) => member !== userId),
				};
			}
			return list;
		});
	
		setItemList(updatedList);
		console.log("User deleted");
		
	}

	// list delete - done
	const handleDeleteList = (listId) => {
		setItemList(prevList => prevList.filter(list => list.id !== listId));
		alert("List has been deleted")
		navigate('/');
	};
	
	// members
	const currentList = itemList.find((item) => item.id === openedItemListDetail.id); 
	const currentListMembers = userList.filter((user) => 
		currentList?.memberList.includes(user.id) || user.id === currentList?.owner
	);

	const ringCss = defineStyle({
		outlineWidth: "2px",
		outlineColor: "orange.500",
		outlineOffset: "2px",
		outlineStyle: "solid",
	  })


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
				<MenuRoot>
					<MenuTrigger asChild>
						<Button variant="outline" size="sm">
							<Text color={"red.500"}>Click me</Text> to change shopping list
						</Button>
					</MenuTrigger>
					<MenuContent>
						{itemList.map((item, index) => (
							<MenuItem
								value={item.id}
								key={item.id}
								bgColor={
									openedItemListDetail && openedItemListDetail.id === item.id
										? "green.500"
										: "white"
								}
								color={
									openedItemListDetail && openedItemListDetail.id === item.id
										? "white"
										: "none"
								}
								onClick={() => handleListChange(index)}
							>
								{item.name}
							</MenuItem>
						))}
					</MenuContent>
				</MenuRoot>
			</Flex>

			<Flex
				width={"75%"}
				minW={"380px"}
				minH={"650px"}
				h="100%"
				bgColor={"gray.100"}
				mx={"auto"}
				borderRadius={"16px"}
			>
				{errorMessage && (
					<Flex width="100%" justifyContent={"center"} alignItems={"center"}>
						<Text color="red.500" textAlign="center" mb={4} fontSize={"32px"}>{errorMessage}</Text>

					</Flex>
				)}
				{!errorMessage && (
					
				<Flex padding={"18px"} width={"100%"} flexDirection={"column"}>

					<Flex justifyContent={"space-between"}>
						<Flex gap={2}>
							<Box>
								{!errorMessage && loggedUser && (
									<>
										{loggedUser?.id === openedItemListDetail?.owner 
										? (
											<Image
												w="28px"
												h="28px"
												objectFit="cover"
												cursor="pointer"
												src={deleteIcon}
												onClick={()=> handleDeleteList(openedItemListDetail.id)}

											/>
										) : (
											<Text cursor="pointer" color={"red.500"} onClick={() =>{handleLeave()}}>
												Leave shopping list
											</Text>
										)}
									</>
								)}
							</Box>
							<Image
								w="38px"
								h="32px"
								display={
									loggedUser?.id === openedItemListDetail?.owner
										? "block"
										: "none"
								}
								objectFit="cover"
								cursor="pointer"
								src={editIcon}
								onClick={() => {handleEdit()}}
							/>
						</Flex>
						<Link href="/">
							<Image
								w="38px"
								h="32px"
								objectFit="cover"
								cursor="pointer"
								src={closeIcon}
							/>
						</Link>
					</Flex>

					{!errorMessage && openedItemListDetail && (
						<Flex
							key={openedItemListDetail.id}
							justifyContent={"center"}
							flexDirection={"column"}
							width={"60%"}
							mx={"auto"}
							mb={"16px"}
						>
							<Text mx={"auto"} fontSize={"36px"}>
								{openedItemListDetail.name}
							</Text>
							<Flex justifyContent={"space-between"}>
								<Text
									lineHeight={"24px"}
									height={"24px"}
									my={"auto"}
									fontSize={"24px"}
								>
									Items :
								</Text>
								<Flex gap={2}>
									<Button
										width={"150px"}
										px={"32px"}
										bgColor={showFinishedItems ? "green.500" : "white"}
										color={showFinishedItems ? "white" : "black"}
										border={showFinishedItems ? "none" : "1px solid black"}
										borderRadius={"16px"}
										onClick={() => handleFilter()}
									>
										{showFinishedItems ? "Hide finished" : "Show finished"}
									</Button>
									<Button px={"32px"} borderRadius={"16px"} onClick={() => {handleAddItem()}}>
										Add item
									</Button>
								</Flex>
							</Flex>
							<Flex flexDirection={"column"} gap={4} mt={"16px"}>
								<Flex px={"24px"} justifyContent={"start"} gap="48px" w="100%">
									<Text fontWeight={500}>Item name</Text>
									<Text fontWeight={500}>Quantity</Text>
								</Flex>
								{items
									.filter(
										(item) => item.shoppingListId === openedItemListDetail.id
									)
									.filter((item) => showFinishedItems || !item.isDone) // all if true, unfinished if false
									.map((item) => (
										<ShoppingListItem
											key={item.id}
											name={item.name}
											quantity={item.quantity}
											isDone={item.isDone}
											onFinish={() => handleFinishItem(item.id)}
											onDelete={() =>{handleDeleteItem(item.id)}}
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
								Users in this list :
							</Text>
							<AvatarGroup size="lg">
							
								{currentListMembers.map((user) => {
									const isOwner = user.id === currentList?.owner;

									return(
										<Avatar
											key={user.id}
											src={user.profilePicUrl}
											name={user.name}
											css={isOwner ? ringCss : "none"}
										/>
									)
								})}
								{/* fallback */}
								{currentListMembers.length > 3 && (
									<Avatar variant="solid" name={`+${currentListMembers.length - 3}`} />
								)}
							</AvatarGroup>
						</Flex>
						<DialogRoot size={"md"}>
						<DialogTrigger asChild>
							<Button px={"32px"} borderRadius={"16px"} fontSize={"1em"}>
							{loggedUser?.id === currentList?.owner ? "Add user to shopping list" : "View Members"}
							</Button>
						</DialogTrigger>
						
						<DialogContent>
							<DialogHeader>
							<DialogTitle>Users</DialogTitle>
							</DialogHeader>
							
							<DialogBody>
							<Flex flexDirection={"column"} gap={4}>
								{userList
								.filter((user) => 
									loggedUser?.id === currentList?.owner || // owner sees all users in the app
									currentList?.memberList.includes(user.id) || // member sees only members
									user.id === currentList?.owner // members see owner
								)
								.map((user) => {
									const isAdded = currentList?.memberList.includes(user.id);
									const isOwner = user.id === currentList?.owner;

									return (
									<Flex key={user.id} justifyContent={"space-between"}>
										<Flex gap={4} alignItems={"center"}>
										<Avatar src={user.profilePicUrl} name={user.name} />
										<Text>{user.name}</Text>
										</Flex>

										{isOwner ? (
										<Text lineHeight="18px" height="18px" fontSize="18px" color="orange.400" alignSelf="center">
											Owner
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
											{isAdded ? "Remove User" : "Add User"}
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
