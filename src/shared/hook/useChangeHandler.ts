import { ChangeEvent } from "react";

const useInputChangeHandler = (
  setValue: (value: string) => void
): ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return handleChange;
};

export default useInputChangeHandler;
