import { Box, Flex, Image, Link, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import deleteIcon from "./assets/icons/delete-icon.svg";
import editIcon from "./assets/icons/edit-icon.svg";
import saveIcon from "./assets/icons/save-icon.svg";
import showIcon from "./assets/icons/show-icon.svg";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "./components/ui/menu";

const App = () => {
	const [loggedUser, setlLoggedUser] = useState();
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
		{ id: "u1", name: "vochomůrka" },
		{ id: "u2", name: "křemílek" },
		{ id: "u3", name: "rákosníček" },
	];

	// Testing purposes
	const handleUserChange = (index) => {
		setlLoggedUser(userList[index]);
		console.log("heree");
	};

	useEffect(()=>{
		setlLoggedUser(userList[0]);
	},[])

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
				{itemList.map((item) => (
					<Box key={item.id} border={"1px solid black"} px={"32px"} py={"32px"}>
						<Flex justifyContent={"space-between"} alignItems={"center"}>
							<Flex gap={4} alignItems={"center"}>
								<Checkbox
									size="md"
									colorPalette="green"
									defaultChecked={item.isDone}
								/>
								<Text>{item.name}</Text>
							</Flex>
							<Flex gap={4}>
								<Link href="list-detail">
									<Image w="32px" h="32px" objectFit="cover" src={showIcon} />
								</Link>
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
										/>
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
