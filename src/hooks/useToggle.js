import { useCallback, useEffect, useState } from "react";

export default function useToggle(initialValue) {
  const [status, setStatus] = useState(initialValue);

  useEffect(() => {
    setStatus(initialValue);
  }, []);

  const toggleStatus = useCallback(() => {
    setStatus(!status);
  }, [status]);

  return [status, toggleStatus, setStatus];
}
