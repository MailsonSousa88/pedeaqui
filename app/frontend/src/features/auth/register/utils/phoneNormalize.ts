export const WHATSAPP_DIGIT_LENGTH = 10

export function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, WHATSAPP_DIGIT_LENGTH)
}

export function formatPhoneInput(value: string): string {
  const digits = getPhoneDigits(value)
  const areaCode = digits.slice(0, 2)
  const firstPart = digits.slice(2, 6)
  const secondPart = digits.slice(6, 10)

  if (digits.length > 6) {
    return `(${areaCode}) ${firstPart}-${secondPart}`
  }

  if (digits.length > 2) {
    return `(${areaCode}) ${firstPart}`
  }

  if (digits.length > 0) {
    return `(${areaCode}`
  }

  return ''
}
