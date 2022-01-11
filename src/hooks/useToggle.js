import { useState } from 'react';

function useToggle(value = false) {
  const [isShow, setIsShow] = useState(value);
  const handleToggle = () => {
    setIsShow((prev) => !prev);
  };

  return [isShow, handleToggle];
}

export default useToggle;

/**
 * Usage:
 *  const [isHappy, toggleIsHappy] = useToggle(true);
 *  {isHappy ? 'vui qua di' : 'buon qua di'}
 */
