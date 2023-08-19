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
  invalidFields = 'Некорректный ввод',
  notFound = 'Неправильный логин или пароль!',
  isExist = 'Пользователь с этим email уже зарегистрирован!',
  invalidPassword = 'Пароль должен содержать от 6 до 15 символов!',
  invalidEmail = 'E-mail адрес должен содержать "@" символ. Пропущен символ "@".',
  invalidName = 'Имя должно содержать как минимум 3 буквы!',
  invalidConfirm = 'Пароли должны совпадать!',
}

export enum AuthFields {
  name = 'Ваше имя',
  password = 'Пароль',
  email = 'E-mail',
  confirm = 'Подтвердите пароль',
}
