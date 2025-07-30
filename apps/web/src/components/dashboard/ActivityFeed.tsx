"use client"

import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react"
import { FiActivity, FiTrendingUp, FiTarget, FiCalendar } from "react-icons/fi"

interface Activity {
  id: string
  tipo: "workout" | "goal" | "achievement" | "reminder"
  titulo: string
  descricao: string
  tempo: string
  icon?: any
}

interface ActivityFeedProps {
  titulo: string
  activities: Activity[]
}

const getActivityIcon = (tipo: Activity["tipo"]) => {
  switch (tipo) {
    case "workout":
      return FiActivity
    case "goal":
      return FiTarget
    case "achievement":
      return FiTrendingUp
    case "reminder":
      return FiCalendar
    default:
      return FiActivity
  }
}

const getActivityColor = (tipo: Activity["tipo"]) => {
  switch (tipo) {
    case "workout":
      return "green.400"
    case "goal":
      return "blue.400"
    case "achievement":
      return "yellow.400"
    case "reminder":
      return "purple.400"
    default:
      return "gray.400"
  }
}

export const ActivityFeed = ({ titulo, activities }: ActivityFeedProps) => {
  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
      p={6}
    >
      <Text fontSize="lg" fontWeight="bold" color="white" mb={6}>
        {titulo}
      </Text>
      
      <VStack spacing={4} align="stretch">
        {activities.map((activity) => (
          <HStack key={activity.id} spacing={4} p={3} bg="gray.700" borderRadius="lg">
            <Box
              p={2}
              bg={getActivityColor(activity.tipo)}
              borderRadius="lg"
              opacity={0.2}
            >
              <Icon
                as={getActivityIcon(activity.tipo)}
                boxSize={4}
                color={getActivityColor(activity.tipo)}
              />
            </Box>
            
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="sm" fontWeight="medium" color="white">
                {activity.titulo}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {activity.descricao}
              </Text>
            </VStack>
            
            <Text fontSize="xs" color="gray.500">
              {activity.tempo}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
