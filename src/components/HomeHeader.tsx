import { HStack, Text, Heading, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
export function HomeHeader() {
  return (
    <HStack bg="gray.800" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{
          uri: "https://media.discordapp.net/attachments/415681919259508738/1041016519762645053/image.png?width=601&height=676",
        }}
        size={16}
        alt="Foto não carregada"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md" fontFamily="heading">
          Olá
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          João
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>

      <MaterialIcons />
    </HStack>
  );
}
