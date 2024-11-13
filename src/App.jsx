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

const App = () => {
	const navigate = useNavigate()

	const [inputs, setInputs] = useState({
		listName: "",
		membersList: [],

		itemList:[]
	});

	const [itemsFromInputs, setItemsFromInputs] = useState([])

	const [addItem, setAddItem] = useState(false)
	const [fetchUsers, setFetchUsers ] = useState(false)
	const [loggedUser, setlLoggedUser] = useState();

	const [shoppingList, setShoppingList] = useState([
		{
			id: "td01",
			name: "První úkolovník",
			state: "active",
			owner: "u1",
			memberList: ["u2", "u3"],
			itemList:[
				{
					id: "2",
					name: "Bananas",
					quantity: 6,
					isDone: false,
				},
			],
			isDone: false,
			isArchived:false
		},
		{
			id: "td02",
			name: "Druhý úkolovník",
			state: "archived",
			owner: "u2",
			memberList: ["u3"],
			itemList:[
				{
					id: "3",
					name: "Milk",
					quantity: 1,
					isDone: false,
				},
			],
			isDone: true,
			isArchived:true
		},
		{
			id: "td03",
			name: "Třetí úkolovník",
			state: "active",
			owner: "u3",
			memberList: ["u1"],
			itemList:[
				{
					id: "5",
					name: "Eggs",
					quantity: 12,
					isDone: false,
				},
				{
					id: "4",
					name: "Bread",
					quantity: 2,
					isDone: true,
				},
			],
			isDone: false,
			isArchived:true
		},
		{
			id: "td04",
			name: "čtvrtý úkolovník",
			state: "archived",
			owner: "u1",
			memberList: [],
			itemList:[
				{
					id: "1",
					name: "Apples",
					quantity: 5,
					isDone: false,
				},
			],
			isDone: true,
			isArchived:true
		},
	]);

	const userList = [
		{ id: "u1", name: "vochomůrka" },
		{ id: "u2", name: "křemílek" },
		{ id: "u3", name: "rákosníček" },
	];

	// Testing purposes
	const handleUserChange = (index) => {
		setlLoggedUser(userList[index]);
	};

	useEffect(() => {
		setlLoggedUser(userList[0]);
	}, []);

	// add shopping list
	const handleAddShoppingList = (inputs, itemInputs) => {

		if (inputs.listName !== "") {
			const newShoppingList = {
				id: Math.random().toString(36).substr(2, 9), // Random id
				name: inputs.listName,
				state: "active",
				owner: loggedUser.id,
				memberList: inputs.membersList,
				itemList:[],
				isDone: false,
			};

			if(itemInputs){
				itemInputs.forEach(item => {
					const newItem = {
						id: item.id,
						itemName: item.itemName,
						quantity: item.itemQuantity,
						isDone: false,
					}
					newShoppingList.itemList.push(newItem);
					console.log(newShoppingList.itemList)
				});
				
			}
			setShoppingList((prevItemLists) => [...prevItemLists, newShoppingList]);

			return;
		}
		console.log("Something went wrong");
	};
	console.log(shoppingList);

	// add item
	const handleAddItem = (itemId) =>{
		const item = inputs.itemList.find((item) => item.id === itemId)
		const itemName = item ? item.listName : null
		const itemQuantity = item ? item.quantity : null

		const newItem = {
			id: itemId,
			itemName: itemName,
			quantity: itemQuantity,
			isDone: false,
			// append item to items array that will be later pushed into itemList array in shoppingList
		}
		setItemsFromInputs((prevItems) => [...prevItems, newItem])
	}

	
	// add user
	const handleAddUser = () => {
		setFetchUsers(!fetchUsers)
	};

	// add field input 
	const handleAddInputFields = () =>{
		const newInputField = {
			id: Math.random().toString(36).substr(2, 9), // Random id
			listName: "",
			quantity: null
		}
		
		setInputs(prevInputs =>({
			...prevInputs,
			itemList: [...prevInputs.itemList, newInputField]
		}))

	}

	// input change of itemList in inputs 
	const handleInputChange = (id, field, value) => {
		setInputs((prevInputs) => ({
			...prevInputs,
			itemList: prevInputs.itemList.map((item) =>
				item.id === id ? { ...item, [field]: value } : item
			),
		}));
	};


	// delete list - done
	const handleDeleteList = (listId) => {
		const deleteList = confirm("Do you want to delete this shopping list ?")
		if(deleteList){
			setShoppingList(prevItemList => prevItemList.filter((item) => item.id !== listId))

		}

	}

	// Navigate to list detail
	const handleShowListDetail = (id) => {
		navigate(`/list-detail/${id}`);
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
								bgColor={loggedUser?.id === user.id ? "green.500" : "white"}
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
				>
					<Text fontSize={"18px"} fontWeight={500}>
						Shopping lists :
					</Text>
					<Flex gap={2}>
						<Button borderRadius={"16px"}>Filter</Button>
						<DialogRoot onOpenChange={() => {setFetchUsers(false), setAddItem(false)}}>
							<DialogTrigger asChild>
								<Button borderRadius={"16px"} px={"32px"}>
									Add shopping list
								</Button>
							</DialogTrigger>

							{/* Create shopping list modal */}
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Create a Shopping list</DialogTitle>
								</DialogHeader>
								<DialogBody>
									<Flex gap={4} flexDirection={"column"} alignItems={"center"}>
										<Field label="Name" required w="81%">
											<Input
												placeholder="Enter shopping list name"
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
															setFetchUsers(!fetchUsers)
														}}
													>
														Add user
														<Image w="22px" h="22px" src={addUserIcon} />
													</Button>
												</Collapsible.Trigger>

												<Collapsible.Content
													style={{ display: "flex", justifyContent: "center", width:"100%", height:"100%" }}
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
													userList.map((user) =>(
														user.id !== loggedUser.id ? (
															<Flex key={user.id} justifyContent={"space-between"}>
																<Flex gap={4} alignItems={"center"}>
																<Avatar src={user.profilePicUrl} name={user.name} />
																<Text>{user.name}</Text>
																</Flex>
																{/* Adds user */}
																<Button
																bgColor={
																	// isAdded ? "red.500" : 
																	"green.500"}
																onClick={() => {
																	handleAddUser(user.id);
																}}
																>
																{"Add User"}
																</Button>

															</Flex>
														): null
													))}
													</Flex>
												</Collapsible.Content>
											</Flex>
										</Collapsible.Root>
										<Collapsible.Root style={{ width: "100%" }}>
											<Flex flexDirection="column" alignItems="center" w="100%">
												<Collapsible.Trigger>
												<Button w={"375px"}>
													Add items <Image w="25px" h="25px" src={addIcon} />
												</Button>
												</Collapsible.Trigger>

												<Collapsible.Content
													style={{ display: "flex", justifyContent: "center", width:"100%", height:"100%" }}
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
													<Button borderRadius="full" p={0} onClick={() => {handleAddInputFields()}}><Image w="25px" h="25px" src={addIcon}/></Button>
													{inputs?.itemList?.map((item)=>(
														<Flex gap={4} alignItems={"end"} key={item.id}>
														<Field label="Item name" w={"35%"}>
															<Input
															onChange={(e) => handleInputChange(item.id, "listName", e.target.value)}
															/>

														</Field>
														<Field label="Quantity" w={"35%"}>
															<Input 
															onChange={(e) => handleInputChange(item.id, "quantity", e.target.value)}/>

														</Field>
														<Box w={"25%"}>

														{(item.itemName !== "" && item.quantity !== "")  &&
															<Button onClick={() => handleAddItem(item.id)}>
																Add item
															</Button>
														}
														
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
										<Button variant="outline">Cancel</Button>
									</DialogActionTrigger>
									<DialogActionTrigger asChild>
										<Button onClick={() => handleAddShoppingList(inputs,itemsFromInputs)}>
											Add Shopping List
										</Button>
									</DialogActionTrigger>
								</DialogFooter>
								<DialogCloseTrigger />
							</DialogContent>
						</DialogRoot>
					</Flex>
				</Flex>
				{shoppingList?.map((item) => (
					item.memberList.includes(loggedUser?.id) || item.owner === loggedUser?.id ? (

					<Box key={item.id} border={"1px solid black"} px={"32px"} py={"32px"}>
						<Flex justifyContent={"space-between"} alignItems={"center"}>
							<Flex gap={4} alignItems={"center"}>
								<Checkbox
									size="md"
									colorPalette="green"
									checked={item.isDone}
								/>
								<Text>{item.name}</Text>
							</Flex>
							<Flex gap={4} alignItems={"center"}>
								<Button onClick={()=> handleShowListDetail(item.id) } variant="ghost" p={0} m={0}>
									<Image w="32px" h="32px" objectFit="cover" src={showIcon} />
								</Button>
								{loggedUser && (
									<>
										<Image
											w="36px"
											h="32px"
											display={loggedUser?.id === item.owner ? "block" : "none"}
											objectFit="cover"
											cursor="pointer"
											src={saveIcon}
										/>
										<Image
											w="38px"
											h="32px"
											display={loggedUser?.id === item.owner ? "block" : "none"}
											objectFit="cover"
											cursor="pointer"
											src={editIcon}
										/>
										<Image
											w="30px"
											h="30px"
											display={loggedUser?.id === item.owner ? "block" : "none"}
											objectFit="cover"
											cursor="pointer"
											src={deleteIcon}
											onClick={() => {handleDeleteList(item.id)}}
										/>
									</>
								)}
							</Flex>
						</Flex>
					</Box>
					) : null
				))}
			</Flex>
		</>
	);
};

export default App;
