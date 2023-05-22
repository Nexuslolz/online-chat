import { UserError } from '../constants/errors';

export const effectPagination = (
  isLoad: boolean,
  lastElement: React.MutableRefObject<HTMLDivElement | null>,
  observer: React.MutableRefObject<IntersectionObserver | null>,
  changePage: () => void,
  loadState: (value: React.SetStateAction<boolean>) => void,
): void => {
  if (isLoad || !lastElement.current) return;

  if (observer.current) observer.current.disconnect();

  const callback = function (entries: IntersectionObserverEntry[]) {
    if (entries[0].isIntersecting) {
      try {
        changePage();
      } catch (err) {
        console.error(`${UserError.postListgetErr}, ${err}`);
      }
    }
  };

  observer.current = new IntersectionObserver(callback);
  observer.current.observe(lastElement.current);
  loadState(false);
};
