import { useState } from "react";

export const useToggle = () => {
  const [mode, setMode] = useState(false);

  const handleToggle = () => {
    setMode((mode) => !mode);
  };

  return { mode, handleToggle };
};
