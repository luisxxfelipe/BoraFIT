import { VStack } from '@chakra-ui/react';
import { ProgressChart } from "./ProgressChart";

interface ProgressItem {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface DashboardProgressSectionProps {
  user?: {
    diasSemana?: number;
  } | null;
}

export const DashboardProgressSection = ({ user }: DashboardProgressSectionProps) => {
  const progressData: ProgressItem[] = [
    { label: "Meta Semanal", value: 4, max: user?.diasSemana || 3, color: "purple" },
    { label: "Cardio (min)", value: 120, max: 180, color: "green" },
    { label: "Força (séries)", value: 15, max: 20, color: "blue" },
    { label: "Flexibilidade", value: 3, max: 5, color: "orange" },
  ];

  return (
    <VStack spacing={6} align="stretch">
      <ProgressChart title="Progresso Semanal" items={progressData} />
    </VStack>
  );
};
