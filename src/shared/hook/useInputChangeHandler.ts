import { ChangeEvent } from "react";
import { InputStoreState } from "./createInputStore";

const useInputChangeHandler = (
  store: () => InputStoreState,
  id: string
): [number | string, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] => {
  const { inputs, setValue } = store();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(id, e.target.value);
  };

  return [inputs[id] || "", handleChange];
};

export default useInputChangeHandler;
