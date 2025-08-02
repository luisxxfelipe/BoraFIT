import { Box, Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Sidebar } from '../components/base/Sidebar';
import { useState } from 'react';
import { TreinoCard } from '../components/treinos/TreinoCard';
import { InserirFichaButton } from '../components/treinos/InserirFichaButton';
import { NovaFichaButton } from '../components/treinos/NovaFichaButton';
import { NovaFichaModal } from '../components/treinos/NovaFichaModal';
import { useDisclosure } from '@chakra-ui/react';

const mockTreinos: any[] = [];

export default function TreinosPage() {
    const [treinos, setTreinos] = useState<any[]>(mockTreinos);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg="gray.900" minH="100vh" position="relative">
            <Sidebar />
            <Box ml="280px" p={6} pt={16} minH="100vh" bg="gray.900" width="calc(100vw - 280px)">
                <VStack spacing={8} align="stretch">
                    <Heading size="lg" color="#a259ff">Meus Treinos</Heading>

                    <Box bg="#23232a" borderRadius="xl" boxShadow="0 0 6px #a259ff" p={8} textAlign="center" mb={8}>
                        <Text color="gray.300" fontSize="lg" mb={6}>
                            {treinos.length === 0
                                ? "Você ainda não possui nenhum treino cadastrado."
                                : "Você pode criar uma nova ficha personalizada a qualquer momento!"}
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <InserirFichaButton />
                            <NovaFichaButton onClick={onOpen} />
                        </SimpleGrid>
                    </Box>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {treinos.map((treino, idx) => (
                            <TreinoCard
                                key={idx}
                                nome={treino.nome}
                                objetivo={treino.objetivo}
                                diasSemana={treino.diasSemana}
                                recomendacoes={treino.recomendacoes}
                            />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Box>
            <NovaFichaModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={data => {
                    setTreinos([...treinos, {
                        nome: 'Ficha IA',
                        objetivo: 'Personalizado',
                        diasSemana: 3,
                        ...data
                    }]);
                    onClose();
                }}
            />
        </Box>
    );
}
