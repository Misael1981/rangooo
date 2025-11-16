export function validatePhone(phone) {
  // Expressão regular para validar o formato: (XX) X XXXX XXXX
  const regex = /^\(\d{2}\) \d \d{4} \d{4}$/;
  return regex.test(phone);
}
