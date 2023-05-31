export const inputError = (error: string, setError: (value: React.SetStateAction<boolean>) => void) => {
  if (error) {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  }
};
