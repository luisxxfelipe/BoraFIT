import { Box, Grid, GridItem, VStack } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from "../components/base/Sidebar";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { DashboardProgressSection } from "../components/dashboard/DashboardProgressSection";
import { DashboardQuickActions } from "../components/dashboard/DashboardQuickActions";
import { DashboardActivityFeedSection } from "../components/dashboard/DashboardActivityFeedSection";
import { DashboardWeeklyOverview } from "../components/dashboard/DashboardWeeklyOverview";

export default function DashboardPage() {
  const { user } = useAuth();

  const recentActivities = [
    {
      id: "1",
      tipo: "workout" as const,
      titulo: "Treino de Cardio Concluído",
      descricao: "45 min - 320 calorias queimadas",
      tempo: "2h atrás",
    },
    {
      id: "2",
      tipo: "achievement" as const,
      titulo: "Meta Semanal Atingida!",
      descricao: "Parabéns! Você completou todos os treinos da semana",
      tempo: "1 dia atrás",
    },
    {
      id: "3",
      tipo: "goal" as const,
      titulo: "Nova Meta Definida",
      descricao: "Perder 2kg até o final do mês",
      tempo: "2 dias atrás",
    },
    {
      id: "4",
      tipo: "reminder" as const,
      titulo: "Lembrete de Hidratação",
      descricao: "Não esqueça de beber água durante o treino",
      tempo: "3 dias atrás",
    },
  ];

  return (
    <Box bg="gray.900" minH="100vh" position="relative">
      <Box position="fixed" left={0} top={0} h="100vh" w="280px" zIndex={100}>
        <Sidebar />
      </Box>
      <Box ml="280px" p={6} pt={16} minH="100vh" bg="gray.900" width="calc(100vw - 280px)">
        <VStack spacing={8} align="stretch">
          <DashboardHeader user={user ?? undefined} />
          <DashboardStats user={user ?? undefined} />
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            <GridItem sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <DashboardQuickActions />
              <DashboardProgressSection user={user ?? undefined} />
            </GridItem>
            <DashboardActivityFeedSection activities={recentActivities} />
          </Grid>
          <DashboardWeeklyOverview />
        </VStack>
      </Box>
    </Box>
  );
}