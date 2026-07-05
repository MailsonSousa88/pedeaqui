import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export const sanitizeCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};

export const isValidCPF = (cpf: string): boolean => {
  const sanitized = sanitizeCPF(cpf);
  return cpfValidator.isValid(sanitized);
};
