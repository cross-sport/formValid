import { useReducer } from "react";

const initialInputState = {
  value: "",
  IsTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, IsTouched: state.IsTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, IsTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", IsTouched: false };
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.IsTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlureHandler = (event) => {
    //onBlure იშვებს როცა ფოკუსირებიდან გამოდის მაუსი ინპუტიდან გარეთ დაწკაპებაზე

    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlureHandler,
    reset,
  };
};

export default useInput;
