import { GridItem } from '@chakra-ui/react';
import { ActivityFeed } from "./ActivityFeed";

interface Activity {
  id: string;
  tipo: 'workout' | 'achievement' | 'goal' | 'reminder';
  titulo: string;
  descricao: string;
  tempo: string;
}

interface DashboardActivityFeedProps {
  activities: Activity[];
}

export const DashboardActivityFeedSection = ({ activities }: DashboardActivityFeedProps) => (
  <GridItem>
    <ActivityFeed titulo="Atividades Recentes" activities={activities} />
  </GridItem>
);
