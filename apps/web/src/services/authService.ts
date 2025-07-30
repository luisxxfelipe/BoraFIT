import { apiFetch } from './api';

export async function login(email: string, password: string) {
  return apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha: password })
  });
}

export async function register(
  nome: string,
  email: string,
  senha: string,
  altura: number,
  peso: number,
  objetivo: string,
  diasSemana: number,
  tipo: string
) {
  return apiFetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, altura, peso, objetivo, diasSemana, tipo })
  });
}
