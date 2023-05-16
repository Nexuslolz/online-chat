import { useState } from 'react';

const useFetch = (fetchFn: (id?: string, param?: string) => Promise<void>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async (id?: string, param?: string) => {
    try {
      setIsLoading(true);
      await fetchFn(id, param);
      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};

export default useFetch;
