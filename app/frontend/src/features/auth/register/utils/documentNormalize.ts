export const CPF_DIGIT_LENGTH = 11

export function getCpfDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, CPF_DIGIT_LENGTH)
}

export function formatCpfInput(value: string): string {
  const digits = getCpfDigits(value)
  const firstBlock = digits.slice(0, 3)
  const secondBlock = digits.slice(3, 6)
  const thirdBlock = digits.slice(6, 9)
  const verifier = digits.slice(9, 11)

  if (digits.length > 9) {
    return `${firstBlock}.${secondBlock}.${thirdBlock}-${verifier}`
  }

  if (digits.length > 6) {
    return `${firstBlock}.${secondBlock}.${thirdBlock}`
  }

  if (digits.length > 3) {
    return `${firstBlock}.${secondBlock}`
  }

  return firstBlock
}
