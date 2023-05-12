import { IPages } from '../types/types';

export const pages: IPages[] = [
  { name: 'Моя страница', route: '/mypage' },
  { name: 'Люди', route: '/friends' },
  { name: 'Мои сообщения', route: '/messages' },
  { name: 'Новости', route: '/' },
];

export enum MyPage {
  edit = 'Редактировать',
  about = 'О себе',
  education = 'Образование',
  hobby = 'Хобби',
  save = 'Сохранить',
}

export enum API_params {
  skip = 4,
  limit = 4,
}
