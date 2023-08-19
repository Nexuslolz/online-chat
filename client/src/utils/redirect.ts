import { NavigateFunction } from 'react-router';

export enum Routes {
  mypage = `/mypage`,
  friends = `/friends`,
  messages = `/messages`,
  error = '*',
}

export const redirect = (router: NavigateFunction, direct: string, id?: string) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  router(`${direct}/${id}`);
};
