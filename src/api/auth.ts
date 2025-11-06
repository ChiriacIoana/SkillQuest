import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from './api';

type AuthInput = {
  username: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
  userId: number;
  username: string;
};

export const login = async ({ username, password }: { username: string; password: string }) => {
  return api.post('/auth/login', { username, password }).then(res => res.data);
};

export const useLogin = (): UseMutationResult<AuthResponse, Error, AuthInput> => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.userId.toString());
    },
  });
};

export const register = async ({ username, password }: { username: string; password: string }) => {
  return api.post('/auth/register', { username, password }).then(res => res.data);
};

export const useRegister = (): UseMutationResult<{ userId: number; username: string }, Error, AuthInput> => {
  return useMutation({
    mutationFn: register,
  });
};
