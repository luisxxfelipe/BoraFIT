import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { InputPadrao } from '../components/base/InputPadrao';
import { NumberInputPadrao } from '../components/base/NumberInputPadrao';
import { SelectPadrao } from '../components/base/SelectPadrao';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { ButtonPadrao } from '../components/base/ButtonPadrao';
import { FiTablet } from 'react-icons/fi';

export default function RegisterPage() {
  const { setToken } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [objetivo, setObjetivo] = useState('');
  const [diasSemana, setDiasSemana] = useState(0);
  const [tipo, setTipo] = useState('comum');
  const objetivoOptions = [
    { value: 'perder_peso', label: 'Perder Peso' },
    { value: 'ganhar_massa', label: 'Ganhar Massa Muscular' },
    { value: 'manter_forma', label: 'Manter Forma Física' },
    { value: 'melhorar_resistencia', label: 'Melhorar Resistência' },
    { value: 'reabilitacao', label: 'Reabilitação' },
  ];
  const tipoOptions = [
    { value: 'comum', label: 'Usuário normal' },
    { value: 'coach', label: 'Coach' },
  ];
  const navigate = useNavigate();

  return (
    <Flex minH="100vh" minW="100vw" bg="#18181b">
      <Flex flex={1} align="center" justify="center">
        <Box rounded="xl" bg="#23232a" boxShadow="0 0 24px #a259ff" p={10} w="700px">
          <Stack spacing={5} align="center">
            <Heading fontSize="2xl" textAlign="center" color="#a259ff">Cadastro BoraFIT</Heading>
            <Box w="100%">
              <Stack spacing={4}>
                <InputPadrao label="Nome" placeholder="Digite seu nome" value={nome} onChange={e => setNome(e.target.value)} />
                <InputPadrao label="Email" type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                <InputPadrao label="Senha" type="password" placeholder="Crie uma senha" value={password} onChange={e => setPassword(e.target.value)} />
              </Stack>
              <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4} mt={4}>
                <NumberInputPadrao label="Altura (cm)" placeholder="170" value={altura} onChange={setAltura} min={100} max={250} />
                <NumberInputPadrao label="Peso (kg)" placeholder="70" value={peso} onChange={setPeso} min={30} max={300} step={0.1} />
                <SelectPadrao label="Objetivo" placeholder="Selecione" value={objetivo} onChange={setObjetivo} options={objetivoOptions} />
                <NumberInputPadrao label="Dias por semana" placeholder="5" value={diasSemana} onChange={setDiasSemana} min={1} max={7} />
              </Box>
              <SelectPadrao label="Tipo de usuário" placeholder="Selecione" value={tipo} onChange={setTipo} options={tipoOptions} mt={4} />
            </Box>
            <Button leftIcon={<FiTablet />} colorScheme="purple" variant="outline" w="100%"
              size="lg"
              onClick={async () => {
                try {
                  const data = await register(
                    nome,
                    email,
                    password,
                    Number(altura),
                    Number(peso),
                    objetivo,
                    Number(diasSemana),
                    tipo
                  );
                  if (data?.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard');
                  } else {
                    alert('Cadastro inválido!');
                  }
                } catch {
                  alert('Erro ao conectar ao servidor!');
                }
              }}
            >
              Cadastrar
            </Button>
            <ButtonPadrao
              color="#a259ff"
              w="100%"
              fontWeight="bold"
              bg="transparent"
              _hover={{ bg: 'rgba(162,89,255,0.08)', color: '#a259ff' }}
              onClick={() => navigate('/login')}
            >
              Já tem conta? Entrar
            </ButtonPadrao>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
