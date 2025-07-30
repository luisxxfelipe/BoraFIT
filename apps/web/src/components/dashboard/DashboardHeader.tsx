import { VStack, HStack, Heading, Text, Button } from '@chakra-ui/react';
import { FiTarget, FiActivity } from "react-icons/fi";

interface DashboardHeaderProps {
  user?: {
    nome?: string;
  } | null;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function getMotivationalMessage() {
  const messages = [
    "Você está no caminho certo!",
    "Cada treino te deixa mais forte!",
    "Consistência é a chave do sucesso!",
    "Seu futuro eu agradece pelo esforço de hoje!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => (
  <VStack spacing={4} align="start">
    <HStack justify="space-between" w="full">
      <VStack align="start" spacing={1}>
        <Heading size="xl" color="white">
          {getGreeting()}, {user?.nome?.split(" ")[0] || "Usuário"}!
        </Heading>
        <Text color="gray.400" fontSize="lg">
          {getMotivationalMessage()}
        </Text>
      </VStack>
      <HStack spacing={3}>
        <Button leftIcon={<FiTarget />} colorScheme="purple" variant="outline" size="sm">
          Nova Meta
        </Button>
        <Button leftIcon={<FiActivity />} colorScheme="purple" size="sm">
          Iniciar Treino
        </Button>
      </HStack>
    </HStack>
  </VStack>
);
