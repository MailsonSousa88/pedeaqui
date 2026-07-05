export const sanitizeCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
};

export const isValidCNPJ = (cnpj: string): boolean => {
  const sanitized = sanitizeCNPJ(cnpj);
  if (sanitized.length !== 14 || /^(\d)\1{13}$/.test(sanitized)) {
    return false;
  }

  let length = sanitized.length - 2;
  let numbers = sanitized.substring(0, length);
  const digits = sanitized.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  length = length + 1;
  numbers = sanitized.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
};
