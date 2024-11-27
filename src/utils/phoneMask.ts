export const phoneMask = (v: string) => {
  const numbers = v.replace(/\D/g, '')
  const thirdDigit = numbers.charAt(2)

  if (thirdDigit === '9') {
    return numbers
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2 ')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  return numbers
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}
