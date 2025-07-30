import { VStack, Box, Text, Button, HStack, SimpleGrid } from '@chakra-ui/react';

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const DashboardWeeklyOverview = () => (
  <Box bg="gray.800" borderRadius="xl" border="1px solid" borderColor="gray.700" p={6}>
    <HStack justify="space-between" mb={6}>
      <Text fontSize="lg" fontWeight="bold" color="white">
        Visão Geral da Semana
      </Text>
      <Button size="sm" variant="ghost" colorScheme="purple">
        Ver Detalhes
      </Button>
    </HStack>
    <SimpleGrid columns={{ base: 1, md: 7 }} spacing={4}>
      {daysOfWeek.map((day, index) => (
        <VStack
          key={day}
          p={4}
          bg={index === 2 || index === 4 ? "primary.600" : "gray.700"}
          borderRadius="lg"
          spacing={2}
          opacity={index === 2 || index === 4 ? 1 : 0.6}
        >
          <Text fontSize="xs" color="gray.300" fontWeight="medium">
            {day}
          </Text>
          <Box w={2} h={2} bg={index === 2 || index === 4 ? "white" : "gray.500"} borderRadius="full" />
          <Text fontSize="xs" color="gray.400">
            {index === 2 || index === 4 ? "Treino" : "Descanso"}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  </Box>
);
