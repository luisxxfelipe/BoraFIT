import { Box, Button, Heading, Text, Grid, GridItem, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { FiActivity, FiTrendingUp, FiTarget, FiCalendar, FiHeart, FiZap, FiAward, FiClock } from "react-icons/fi"
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from "../components/base/Sidebar"
import { StatCard } from "../components/dashboard/StatCard"
import { ProgressChart } from "../components/dashboard/ProgressChart"
import { ActivityFeed } from "../components/dashboard/ActivityFeed"

export default function DashboardPage() {
  const { user } = useAuth();

   // Dados mockados baseados no perfil do usuário
  const stats = [
    {
      title: "Treinos Concluídos",
      value: 12,
      subtitle: "Este mês",
      icon: FiActivity,
      trend: { value: "8%", isPositive: true },
      color: "green.400",
    },
    {
      title: "Calorias Queimadas",
      value: "2,340",
      subtitle: "Esta semana",
      icon: FiZap,
      trend: { value: "12%", isPositive: true },
      color: "orange.400",
    },
    {
      title: "Peso Atual",
      value: `${user?.weight || 70}kg`,
      subtitle: `Meta: ${(user?.weight || 70) - 5}kg`,
      icon: FiTrendingUp,
      trend: { value: "2kg", isPositive: false },
      color: "blue.400",
    },
    {
      title: "Próximo Treino",
      value: "Hoje",
      subtitle: "16:00 - Cardio",
      icon: FiClock,
      color: "purple.400",
    },
  ]

  const progressData = [
    { label: "Meta Semanal", value: 4, max: user?.daysPerWeek || 3, color: "purple" },
    { label: "Cardio (min)", value: 120, max: 180, color: "green" },
    { label: "Força (séries)", value: 15, max: 20, color: "blue" },
    { label: "Flexibilidade", value: 3, max: 5, color: "orange" },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "workout" as const,
      title: "Treino de Cardio Concluído",
      description: "45 min - 320 calorias queimadas",
      time: "2h atrás",
    },
    {
      id: "2",
      type: "achievement" as const,
      title: "Meta Semanal Atingida!",
      description: "Parabéns! Você completou todos os treinos da semana",
      time: "1 dia atrás",
    },
    {
      id: "3",
      type: "goal" as const,
      title: "Nova Meta Definida",
      description: "Perder 2kg até o final do mês",
      time: "2 dias atrás",
    },
    {
      id: "4",
      type: "reminder" as const,
      title: "Lembrete de Hidratação",
      description: "Não esqueça de beber água durante o treino",
      time: "3 dias atrás",
    },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  }

  const getMotivationalMessage = () => {
    const messages = [
      "Você está no caminho certo!",
      "Cada treino te deixa mais forte!",
      "Consistência é a chave do sucesso!",
      "Seu futuro eu agradece pelo esforço de hoje!",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <Box bg="gray.900" minH="100vh">
      <Sidebar />

      <Box ml="280px" p={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} align="start">
            <HStack justify="space-between" w="full">
              <VStack align="start" spacing={1}>
                <Heading size="xl" color="white">
                  {getGreeting()}, {user?.name?.split(" ")[0] || "Usuário"}!
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

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </SimpleGrid>

          {/* Main Content Grid */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            {/* Progress Section */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                <ProgressChart title="Progresso Semanal" items={progressData} />

                {/* Quick Actions */}
                <Box bg="gray.800" borderRadius="xl" border="1px solid" borderColor="gray.700" p={6}>
                  <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
                    Ações Rápidas
                  </Text>

                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                    <Button
                      leftIcon={<FiActivity />}
                      variant="ghost"
                      colorScheme="purple"
                      size="sm"
                      flexDirection="column"
                      h="auto"
                      py={4}
                    >
                      <Text fontSize="xs" mt={2}>
                        Novo Treino
                      </Text>
                    </Button>

                    <Button
                      leftIcon={<FiHeart />}
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      flexDirection="column"
                      h="auto"
                      py={4}
                    >
                      <Text fontSize="xs" mt={2}>
                        Saúde
                      </Text>
                    </Button>

                    <Button
                      leftIcon={<FiCalendar />}
                      variant="ghost"
                      colorScheme="blue"
                      size="sm"
                      flexDirection="column"
                      h="auto"
                      py={4}
                    >
                      <Text fontSize="xs" mt={2}>
                        Agendar
                      </Text>
                    </Button>

                    <Button
                      leftIcon={<FiAward />}
                      variant="ghost"
                      colorScheme="yellow"
                      size="sm"
                      flexDirection="column"
                      h="auto"
                      py={4}
                    >
                      <Text fontSize="xs" mt={2}>
                        Conquistas
                      </Text>
                    </Button>
                  </SimpleGrid>
                </Box>
              </VStack>
            </GridItem>

            {/* Activity Feed */}
            <GridItem>
              <ActivityFeed title="Atividades Recentes" activities={recentActivities} />
            </GridItem>
          </Grid>

          {/* Bottom Section - Weekly Overview */}
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
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
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
        </VStack>
      </Box>
    </Box>
  )
}