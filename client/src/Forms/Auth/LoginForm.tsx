import React, { useState } from "react";
import { login } from "../../APIs/Auth/Auth";
import SubmitButton from "../../Components/Buttons/SubmitButton";
import CustomInputField from "../../Components/InputFields/CustomInputField";
import { AuthValues } from "../../Types/types";

const LoginForm = () => {
  const [values, setValues] = useState<AuthValues>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(values).then((data: any) => {
      if (data.error) {
        alert("error");
      } else {
        alert("success");
        console.log(data);
      }
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <CustomInputField
          label={`Email`}
          name={`email`}
          type={`text`}
          changeHandler={handleChange}
        />

        <CustomInputField
          label={`Password`}
          name={`password`}
          type={`password`}
          changeHandler={handleChange}
        />

        <SubmitButton />
      </form>
    </div>
  );
};

export default LoginForm;
