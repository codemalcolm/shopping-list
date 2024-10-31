import { Box, Button, Flex, Image, ListItem, Text,Link } from '@chakra-ui/react'
import {Avatar, AvatarGroup} from "./components/ui/avatar"
import editIcon from "./assets/icons/edit-icon.svg";
import deleteIcon from "./assets/icons/delete-icon.svg";
import closeIcon from "./assets/icons/close-icon.svg";
import ShoppingListItem from './ShoppingListItem';

const ShoppingListDetail = () => {
  return (
    <Flex width={"75%"} minW={"380px"} height={"650px"} bgColor={"gray.100"} mx={"auto"} borderRadius={"16px"}>
    <Flex padding={"18px"} width={"100%"} flexDirection={"column"}>
    {/* Toolbar */}
      <Flex justifyContent={"space-between"}>
        <Flex gap={2}>
          <Image w="28px" h="28px" objectFit="cover" cursor="pointer" src={deleteIcon} />
          <Image w="38px" h="32px" objectFit="cover" cursor="pointer" src={editIcon} />
        </Flex>
        <Link href="/">
          <Image w="38px" h="32px" objectFit="cover" cursor="pointer" src={closeIcon} />
        </Link>
      </Flex>
      <Flex justifyContent={"center"} flexDirection={"column"} width={"60%"} mx={"auto"}>
        <Text mx={"auto"} fontSize={"36px"}>List name</Text>
        <Flex justifyContent={"space-between"}>
          <Text lineHeight={"24px"} height={"24px"} my={"auto"} fontSize={"24px"}>Items :</Text>
          <Button px={"32px"} borderRadius={"16px"}>Add item</Button>
        </Flex>
        <Flex flexDirection={"column"} gap={4} mt={"16px"}>
          <Flex px={"24px"} justifyContent={"start"} gap="48px" w="100%">
            <Text fontWeight={500}>Item name</Text>
            <Text fontWeight={500}>Quantity</Text>
          </Flex>
          <ShoppingListItem/>
          <ShoppingListItem/>

        </Flex>
      </Flex>
      <Flex borderTop={"1px solid black"} mt={"auto"} padding={"28px"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"1.2vw"} fontWeight={500}>
            Users in this list :
          </Text>
          <AvatarGroup size="lg">
            <Avatar
              src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"
              name="Uchiha Sasuke"
            />
            <Avatar
              src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c"
              name="Baki Ani"
            />
            <Avatar
              src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863"
              name="Uchiha Chan"
            />
            <Avatar variant="solid" fallback="+3" />
          </AvatarGroup>
        </Flex>
          <Button px={"32px"} borderRadius={"16px"} fontSize={"1.2vw"}>Add user to shopping list</Button>
      </Flex>
    </Flex>
    </Flex>
  )
}

export default ShoppingListDetail