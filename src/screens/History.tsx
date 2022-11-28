import {} from "react-native";
import { VStack, Heading, SectionList, Text } from "native-base";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { useState } from "react";
export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "27/11/22",
      data: ["Puxada Frontal", "Remada unilateral"],
    },
    {
      title: "29/11/22",
      data: ["Puxada frontal"],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          [].length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda. {" \n"} Vamos nos exercitar
            hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
