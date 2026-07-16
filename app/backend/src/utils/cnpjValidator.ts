import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export const sanitizeCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
};

export const isValidCNPJ = (cnpj: string): boolean => {
  const sanitized = sanitizeCNPJ(cnpj);
  return sanitized.length === 14 && cnpjValidator.isValid(sanitized, true);
};
