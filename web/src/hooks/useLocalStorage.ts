import { useEffect, useRef, useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storagedValue, setStoragedValue] = useState<T | undefined>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue || undefined;
  });
  const storagedValueRef = useRef<T | undefined>();

  useEffect(() => {
    storagedValueRef.current = storagedValue;
  }, [storagedValue]);

  useEffect(() => {
    if (initialValue) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [initialValue, key]);

  const setValue = useCallback(
    (value: T | ((val: T | undefined) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storagedValueRef.current) : value;

        setStoragedValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoragedValue(undefined);
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return [storagedValue, setValue, removeValue] as const;
}
