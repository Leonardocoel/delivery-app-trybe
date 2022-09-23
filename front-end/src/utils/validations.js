export default function validations(email, password) {
  const regexEmail = /^[\w.-]+@[\w]+\.[a-z]+(\.[a-z]+)?$/i;
  const validateEmail = regexEmail.test(email);
  const PASSWORD_LENGTH = 6;
  const validation = validateEmail && password.length >= PASSWORD_LENGTH;
  return validation;
}
