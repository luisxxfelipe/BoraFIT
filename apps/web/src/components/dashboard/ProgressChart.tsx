"use client"

import { Box, VStack, HStack, Text, Progress } from "@chakra-ui/react"

interface ProgressItem {
  label: string
  value: number
  max: number
  color?: string
}

interface ProgressChartProps {
  title: string
  items: ProgressItem[]
}

export const ProgressChart = ({ title, items }: ProgressChartProps) => {
  return (
    <Box bg="gray.800" borderRadius="xl" border="1px solid" borderColor="gray.700" p={6}>
      <Text fontSize="lg" fontWeight="bold" color="white" mb={6}>
        {title}
      </Text>

      <VStack spacing={4} align="stretch">
        {items.map((item, index) => (
          <VStack key={index} spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.300">
                {item.label}
              </Text>
              <Text fontSize="sm" color="white" fontWeight="medium">
                {item.value}/{item.max}
              </Text>
            </HStack>
            <Progress
              value={(item.value / item.max) * 100}
              colorScheme={item.color || "purple"}
              bg="gray.700"
              borderRadius="full"
              size="sm"
            />
          </VStack>
        ))}
      </VStack>
    </Box>
  )
}
