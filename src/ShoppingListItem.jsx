import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Checkbox } from "./components/ui/checkbox";
import deleteIcon from "./assets/icons/delete-icon.svg";
import { Trash2 } from "lucide-react";

const ShoppingListItem = (props) => {
  const { name, quantity,isDone, onFinish, onDelete } = props;


	
	return (
		<Box
			w={"100%"}
			bgColor={{base:"gray.200", _dark:"gray.600"}}
			px={{sm:"24px", base:"8px"}}
			py={"24px"}
			borderRadius={"4px"}
		>
			<Flex justifyContent={"space-between"}>
				<Flex justifyContent={"space-between"} width={"40%"}>
					<Text fontWeight={"500"}>{name}</Text>
					<Text fontWeight={"500"}>{quantity}</Text>
				</Flex>
				<Flex alignItems={"center"} gap={2}>
					<Box
						objectFit="cover"
						cursor="pointer"
						onClick={onDelete}
						color="red"
					>
						<Trash2/>
					</Box>
					<Checkbox
						size="md"
						variant={"solid"}
						colorPalette="green"
						border="solid 1px gray"
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
