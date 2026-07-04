export const sanitizeCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};

export const isValidCPF = (cpf: string): boolean => {
  const sanitized = sanitizeCPF(cpf);
  if (sanitized.length !== 11 || /^(\d)\1{10}$/.test(sanitized)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(sanitized.charAt(i)) * (10 - i);
  }
  let rest = sum % 11;
  let digit1 = rest < 2 ? 0 : 11 - rest;

  if (digit1 !== parseInt(sanitized.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(sanitized.charAt(i)) * (11 - i);
  }
  rest = sum % 11;
  let digit2 = rest < 2 ? 0 : 11 - rest;

  return digit2 === parseInt(sanitized.charAt(10));
};
