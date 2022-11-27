import { Text, Pressable, IPressableProps } from "native-base";

type Props = {
  name: string;
  isActive: boolean;
  onPress: () => void;
};

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.700"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{ borderColor: "green.500", borderWidth: 1 }}
      {...rest}
    >
      <Text
        color={isActive ? "green.500" : "gray.300"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
}
