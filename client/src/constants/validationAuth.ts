export const EMAIL_REG_EXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 15;
export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 16;

export enum Validations {
  email,
  password,
  name,
  confirmPassword,
}

export enum AuthErrorsMessage {
  invalidFields = 'Invalid form fields',
  notFound = 'Incorrect login or password!',
  isExist = 'User with this email is already registered',
}
