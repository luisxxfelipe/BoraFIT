import { HStack, Box, Text, Icon, Collapse, VStack, useDisclosure } from '@chakra-ui/react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export interface SidebarItemProps {
  icon: any;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
  to?: string;
  submenuItems?: Array<{ icon: any; label: string; to?: string }>;
}

export const SidebarItem = ({ icon, label, isActive = false, hasSubmenu = false, onClick, to, submenuItems }: SidebarItemProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box w="full">
      {to ? (
        <Link to={to} style={{ textDecoration: 'none' }}>
          <HStack
            p={3}
            borderRadius="lg"
            cursor="pointer"
            bg={isActive ? 'primary.600' : 'transparent'}
            color={isActive ? 'white' : 'gray.300'}
            _hover={{ bg: isActive ? 'primary.700' : 'gray.700', color: 'white' }}
            transition="all 0.2s"
            justify="space-between"
          >
            <HStack spacing={3}>
              <Icon as={icon} boxSize={5} />
              <Text fontWeight="medium" fontSize="sm">{label}</Text>
            </HStack>
            {hasSubmenu && (
              <Icon as={isOpen ? FiChevronDown : FiChevronRight} boxSize={4} transition="transform 0.2s" />
            )}
          </HStack>
        </Link>
      ) : (
        <HStack
          p={3}
          borderRadius="lg"
          cursor="pointer"
          bg={isActive ? 'primary.600' : 'transparent'}
          color={isActive ? 'white' : 'gray.300'}
          _hover={{ bg: isActive ? 'primary.700' : 'gray.700', color: 'white' }}
          transition="all 0.2s"
          onClick={hasSubmenu ? onToggle : onClick}
          justify="space-between"
        >
          <HStack spacing={3}>
            <Icon as={icon} boxSize={5} />
            <Text fontWeight="medium" fontSize="sm">{label}</Text>
          </HStack>
          {hasSubmenu && (
            <Icon as={isOpen ? FiChevronDown : FiChevronRight} boxSize={4} transition="transform 0.2s" />
          )}
        </HStack>
      )}
      {hasSubmenu && submenuItems && (
        <Collapse in={isOpen}>
          <VStack align="stretch" pl={8} pt={2} spacing={1}>
            {submenuItems.map((item, idx) => (
              item.to ? (
                <Link to={item.to} key={idx} style={{ textDecoration: 'none' }}>
                  <SidebarItem icon={item.icon} label={item.label} to={item.to} />
                </Link>
              ) : (
                <SidebarItem key={idx} icon={item.icon} label={item.label} />
              )
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};
