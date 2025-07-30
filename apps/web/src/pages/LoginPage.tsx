import { Box, Flex, Heading, Stack, Button } from '@chakra-ui/react';
import { InputPadrao } from '../components/base/InputPadrao';
import { ButtonPadrao } from '../components/base/ButtonPadrao';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { login as loginApi } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FiTarget } from 'react-icons/fi';

export default function LoginPage() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <Flex minH="100vh" minW="100vw" bg="#18181b">
      <Flex flex={1} align="center" justify="center">
        <Box rounded="xl" bg="#23232a" boxShadow="0 0 24px #a259ff" p={10} w="400px">
          <Stack spacing={5} align="center">
            <Heading fontSize="2xl" textAlign="center" color="#a259ff">Login BoraFIT</Heading>
            <InputPadrao label="Email" type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
            <InputPadrao label="Senha" type="password" placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} />
            <Button leftIcon={<FiTarget />} colorScheme="purple" variant="outline" size="sm" w="100%"
              onClick={async () => {
                try {
                  const data = await loginApi(email, password);
                  if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard');
                  } else {
                    alert('Login inválido!');
                  }
                } catch {
                  alert('Erro ao conectar ao servidor!');
                }
              }}
            >
              Entrar
            </Button>
            <ButtonPadrao
              color="#a259ff"
              w="100%"
              fontWeight="bold"
              bg="transparent"
              _hover={{ bg: 'rgba(162,89,255,0.08)', color: '#a259ff' }}
              onClick={() => navigate('/register')}
            >
              Não tem conta? Cadastre-se
            </ButtonPadrao>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
