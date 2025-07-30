import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  Divider,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react'
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiBarChart,
  FiCalendar,
  FiMessageSquare,
} from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'

interface SidebarItemProps {
  icon: any
  label: string
  isActive?: boolean
  hasSubmenu?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon, label, isActive = false, hasSubmenu = false, onClick }: SidebarItemProps) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box w="full">
      <HStack
        p={3}
        borderRadius="lg"
        cursor="pointer"
        bg={isActive ? 'primary.600' : 'transparent'}
        color={isActive ? 'white' : 'gray.300'}
        _hover={{
          bg: isActive ? 'primary.700' : 'gray.700',
          color: 'white',
        }}
        transition="all 0.2s"
        onClick={hasSubmenu ? onToggle : onClick}
        justify="space-between"
      >
        <HStack spacing={3}>
          <Icon as={icon} boxSize={5} />
          <Text fontWeight="medium" fontSize="sm">
            {label}
          </Text>
        </HStack>
        {hasSubmenu && (
          <Icon
            as={isOpen ? FiChevronDown : FiChevronRight}
            boxSize={4}
            transition="transform 0.2s"
          />
        )}
      </HStack>
      {hasSubmenu && (
        <Collapse in={isOpen}>
          <VStack align="stretch" pl={8} pt={2} spacing={1}>
            <SidebarItem icon={FiBarChart} label="Relatórios" />
            <SidebarItem icon={FiCalendar} label="Agenda" />
          </VStack>
        </Collapse>
      )}
    </Box>
  )
}

// Sidebar customizada para uso exclusivo na dashboard
export const Sidebar = () => {
  const { user, logout } = useAuth()

  return (
    <Box
      w="280px"
      h="100vh"
      bg="gray.800"
      borderRight="1px solid"
      borderColor="gray.700"
      p={4}
      position="fixed"
      left={0}
      top={0}
      zIndex={1000}
    >
      <VStack align="stretch" h="full" spacing={0}>
        {/* Header */}
        <VStack spacing={4} pb={6}>
          <HStack spacing={3} w="full" p={3} bg="gray.700" borderRadius="lg">
            <Avatar
              size="sm"
              name={user?.name || 'Usuário'}
              bg="primary.600"
              color="white"
            />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="bold" color="white">
                {user?.name || 'Usuário'}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {user?.type === 'coach' ? 'Coach' : 'Usuário'}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <Divider borderColor="gray.700" />
        {/* Navigation */}
        <VStack align="stretch" spacing={2} py={6} flex={1}>
          <SidebarItem icon={FiHome} label="Dashboard" isActive />
          <SidebarItem icon={FiUser} label="Perfil" />
          <SidebarItem icon={FiBarChart} label="Analytics" hasSubmenu />
          <SidebarItem icon={FiMessageSquare} label="Mensagens" />
          <SidebarItem icon={FiCalendar} label="Calendário" />
          <SidebarItem icon={FiSettings} label="Configurações" />
        </VStack>
        <Divider borderColor="gray.700" />
        {/* Footer */}
        <VStack spacing={2} pt={4}>
          <SidebarItem
            icon={FiLogOut}
            label="Sair"
            onClick={logout}
          />
        </VStack>
      </VStack>
    </Box>
  )
}
