import { useCallback, useEffect, useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const reset = () => {
    setValue(initialValue);
  };

  const onChangeValue = useCallback(
    (e) => {
      const target = e.target.value;
      setValue(target);
    },
    [value]
  );

  return [value, onChangeValue, reset];
};

export default useInput;
