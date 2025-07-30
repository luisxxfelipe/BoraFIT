"use client"

import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react"
import type { IconType } from "react-icons"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: IconType
  trend?: {
    value: string
    isPositive: boolean
  }
  color?: string
}

export const StatCard = ({ title, value, subtitle, icon, trend, color = "primary.500" }: StatCardProps) => {
  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
      p={6}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(139, 92, 246, 0.15)",
      }}
    >
      <HStack justify="space-between" align="start" mb={4}>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.400" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {value}
          </Text>
          {subtitle && (
            <Text fontSize="xs" color="gray.500">
              {subtitle}
            </Text>
          )}
        </VStack>
        <Box p={3} bg="gray.700" borderRadius="lg">
          <Icon as={icon} boxSize={6} color={color} />
        </Box>
      </HStack>

      {trend && (
        <HStack spacing={2}>
          <Text fontSize="sm" color={trend.isPositive ? "green.400" : "red.400"} fontWeight="medium">
            {trend.isPositive ? "+" : ""}
            {trend.value}
          </Text>
          <Text fontSize="sm" color="gray.400">
            vs. semana passada
          </Text>
        </HStack>
      )}
    </Box>
  )
}
