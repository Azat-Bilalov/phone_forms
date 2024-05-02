import * as React from 'react';

export const useFieldFocus = () => {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const handleFocus = React.useCallback(() => {
    setIsActive(true);
  }, [setIsActive]);

  const handleBlur = React.useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  return {
    isActive,
    setIsActive,
    handleFocus,
    handleBlur,
  };
};
