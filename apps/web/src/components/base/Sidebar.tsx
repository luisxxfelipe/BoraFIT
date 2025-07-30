import { Box, VStack, HStack, Text, Avatar, Divider } from '@chakra-ui/react';
import { FiHome, FiUser, FiSettings, FiLogOut, FiCalendar, FiMessageSquare, FiActivity, FiHeart, FiAward, FiUsers, FiFileText } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { SidebarItem } from './SidebarItem';

interface SidebarItemProps {
  icon: any
  label: string
  isActive?: boolean
  hasSubmenu?: boolean
  onClick?: () => void
}

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const nomeUsuario = user && user.nome && user.nome.trim() !== '' ? user.nome : 'Usuário';

  const sidebarItems = [
    { icon: FiHome, label: 'Dashboard', isActive: true },
    { icon: FiUser, label: 'Perfil' },
    { icon: FiActivity, label: 'Treinos' },
    { icon: FiHeart, label: 'Dieta' },
    { icon: FiUsers, label: 'Ranking/Amigos' },
    {
      icon: FiFileText,
      label: 'Relatórios',
      hasSubmenu: true,
      submenuItems: [
        { icon: FiFileText, label: 'Evolução Mensal' },
        { icon: FiAward, label: 'Conquistas' },
      ],
    },
    { icon: FiMessageSquare, label: 'Chat IA' },
    { icon: FiCalendar, label: 'Agenda' },
    { icon: FiSettings, label: 'Configurações' },
  ];

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
              name={nomeUsuario}
              bg="primary.600"
              color="white"
            />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="bold" color="white">
                {nomeUsuario}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {user?.tipo === 'coach' ? 'Coach' : 'Usuário'}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <Divider borderColor="gray.700" />
        {/* Navigation */}
        <VStack align="stretch" spacing={2} py={6} flex={1}>
          {sidebarItems.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
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
  );
};
