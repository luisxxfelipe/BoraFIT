import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { FiActivity, FiHeart, FiCalendar, FiAward } from "react-icons/fi";

export const DashboardQuickActions = () => (
  <Box bg="gray.800" borderRadius="xl" border="1px solid" borderColor="gray.700" p={6}>
    <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
      Ações Rápidas
    </Text>
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      <Button leftIcon={<FiActivity />} variant="ghost" border="1px solid" borderColor="gray.600" colorScheme="purple" size="sm" flexDirection="column" h="auto" py={4}>
        <Text fontSize="xs" mt={2}>Novo Treino</Text>
      </Button>
      <Button leftIcon={<FiHeart />} variant="ghost" border="1px solid" borderColor="gray.600" colorScheme="red" size="sm" flexDirection="column" h="auto" py={4}>
        <Text fontSize="xs" mt={2}>Saúde</Text>
      </Button>
      <Button leftIcon={<FiCalendar />} variant="ghost" border="1px solid" borderColor="gray.600" colorScheme="blue" size="sm" flexDirection="column" h="auto" py={4}>
        <Text fontSize="xs" mt={2}>Agendar</Text>
      </Button>
      <Button leftIcon={<FiAward />} variant="ghost" border="1px solid" borderColor="gray.600" colorScheme="yellow" size="sm" flexDirection="column" h="auto" py={4}>
        <Text fontSize="xs" mt={2}>Conquistas</Text>
      </Button>
    </SimpleGrid>
  </Box>
);
