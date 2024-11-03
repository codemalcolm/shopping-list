import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Checkbox } from "./components/ui/checkbox";
import deleteIcon from "./assets/icons/delete-icon.svg";

const ShoppingListItem = (props) => {
  const { name, quantity,isDone, onFinish, onDelete } = props;


	
	return (
		<Box
			w={"100%"}
			bgColor={"gray.200"}
			px={"24px"}
			py={"24px"}
			borderRadius={"4px"}
		>
			<Flex justifyContent={"space-between"}>
				<Flex justifyContent={"space-between"} width={"40%"}>
					<Text fontWeight={"500"}>{name}</Text>
					<Text fontWeight={"500"}>{quantity}</Text>
				</Flex>
				<Flex alignItems={"center"} gap={2}>
					<Image
						w="20px"
						h="20px"
						objectFit="cover"
						cursor="pointer"
						src={deleteIcon}
						onClick={onDelete}
					/>
					<Checkbox
						size="md"
						variant={"solid"}
						colorPalette="green"
						border="solid 1px black"
						borderRadius="4px"
            			defaultChecked={isDone}
						onChange={onFinish}

					/>
				</Flex>
			</Flex>
		</Box>
	);
};

export default ShoppingListItem;
