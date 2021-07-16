import { useState } from 'react';

function useToggleMenus(value = false) {
  const [isShow, setIsShow] = useState(value);

  const handleShow = e => {
    setIsShow(e.currentTarget);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return [isShow, handleShow, handleClose];
}

export default useToggleMenus;

/**
 * Usage:
 *  const [isHappy, toggleIsHappy] = useToggle(true);
 *  {isHappy ? 'vui qua di' : 'buon qua di'}
 */
