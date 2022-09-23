export default function validations(email, password, name) {
  const regexEmail = /^[\w.-]+@[\w]+\.[a-z]+(\.[a-z]+)?$/i;
  const validateEmail = regexEmail.test(email);
  const PASSWORD_LENGTH = 6;
  const NAME_LENGTH = 12;
  const validationRegister = validateEmail
  && password.length >= PASSWORD_LENGTH && name.length >= NAME_LENGTH;
  return validationRegister;
}
