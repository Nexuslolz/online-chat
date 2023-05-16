import { IPages } from '../types/types';

export const pages: IPages[] = [
  { name: 'Моя страница', route: '/mypage' },
  { name: 'Мои сообщения', route: '/messages' },
  { name: 'Люди', route: '/friends' },
  { name: 'Новости', route: '/' },
];

export enum MyPage {
  edit = 'Редактировать',
  about = 'О себе',
  education = 'Образование',
  hobby = 'Хобби',
  save = 'Сохранить',
  birth = 'Дата рождения',
  enterBirth = 'Выберите вашу дату рождения...',
  city = 'Город',
  enterCity = 'Введите ваш город...',
  noValue = 'Не указано',
  age = 'Возраст',
  years = 'лет',
}

export enum API_params {
  skip = 4,
  limit = 4,
}
