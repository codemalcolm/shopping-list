import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import deleteIcon from "./assets/icons/delete-icon.svg";
import editIcon from "./assets/icons/edit-icon.svg";
import saveIcon from "./assets/icons/save-icon.svg";
import showIcon from "./assets/icons/show-icon.svg";

const App = () => {
	const [itemList, setItemList] = useState([
		{
			id: "td01",
			name: "První úkolovník",
			state: "active",
			owner: "u1",
			memberList: ["u2", "u3"],
		},
		{
			id: "td02",
			name: "Druhý úkolovník",
			state: "archived",
			owner: "u2",
			memberList: ["u3"],
		},
		{
			id: "td03",
			name: "Třetí úkolovník",
			state: "active",
			owner: "u3",
			memberList: ["u1"],
		},
		{
			id: "td04",
			name: "čtvrtý úkolovník",
			state: "archived",
			owner: "u1",
			memberList: [],
		},
	]);

  const [loggedInUser, setLoggedInUser] = useState("u1");
  const value = {
    userList: [
      { id: "u1", name: "vochomůrka" },
      { id: "u2", name: "křemílek" },
      { id: "u3", name: "rákosníček" },
    ],
  };

	return (
		<Flex gap={8} flexDirection={"column"}>
			{itemList.map((item) => (
				<Box key={item.id} border={"1px solid black"} px={"32px"} py={"32px"}>
					<Flex justifyContent={"space-between"} alignItems={"center"}>
						<Flex gap={4} alignItems={"center"}>
              <Checkbox size="md" colorPalette="green" disabled/>
              <Text>{item.name}</Text>
            </Flex>
						<Flex gap={4}>
              <Link href="list-detail">
                <Image w="32px" h="32px" objectFit="cover" src={showIcon}/>
              </Link>
							<Image w="36px" h="32px" objectFit="cover" src={saveIcon} />
							<Image w="38px" h="32px" objectFit="cover" src={editIcon} />
							<Image w="30px" h="30px" objectFit="cover" src={deleteIcon} />
						</Flex>
					</Flex>
				</Box>
			))}
		</Flex>
	);
};

export default App;
