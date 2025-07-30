import { SimpleGrid } from '@chakra-ui/react';
import { StatCard } from "./StatCard";
import { FiActivity, FiTrendingUp, FiZap, FiClock } from "react-icons/fi";

interface Stat {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  trend?: { value: string; isPositive: boolean };
  color: string;
}

interface DashboardStatsProps {
  user?: {
    peso?: number;
    diasSemana?: number;
  } | null;
}

export const DashboardStats = ({ user }: DashboardStatsProps) => {
  const stats: Stat[] = [
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
      value: `${user?.peso || 70}kg`,
      subtitle: `Meta: ${(user?.peso || 70) - 5}kg`,
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
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </SimpleGrid>
  );
};
