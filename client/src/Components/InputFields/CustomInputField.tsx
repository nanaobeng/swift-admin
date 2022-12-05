import React from "react";
import { InputProps } from "../../Types/types";

const CustomInputField = ({ label, name, type, changeHandler }: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <br />
      <input type={type} name={name} onChange={changeHandler} />
    </div>
  );
};

export default CustomInputField;
