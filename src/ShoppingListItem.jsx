import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Checkbox } from './components/ui/checkbox'
import deleteIcon from "./assets/icons/delete-icon.svg";

const ShoppingListItem = () => {
  return (
    <Box w={"100%"} bgColor={"gray.200"} px={"24px"} py={"24px"} borderRadius={"4px"}>
      <Flex justifyContent={"space-between"}>
        <Flex justifyContent={"space-between"} width={"40%"}>
            <Text fontWeight={"500"}>Shopping list</Text>
            <Text fontWeight={"500"}>2</Text>
        </Flex>
        <Flex alignItems={"center"}gap={2}>
            <Image w="20px" h="20px" objectFit="cover" cursor="pointer" src={deleteIcon} />
            <Checkbox zIndex={999} size="md" variant={"solid"} colorPalette="green"/>

        </Flex>
      </Flex>
    </Box>
  )
}

export default ShoppingListItem
