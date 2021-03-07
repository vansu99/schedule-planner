import { useCallback, useEffect, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChangeValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value]
  );

  return [value, onChangeValue, setValue];
};

export default useInput;
