import React from "react";

export const useCheckboxState = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);
  return { checked, onChange: setChecked };
};

export const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};