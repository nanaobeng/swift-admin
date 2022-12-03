export type AuthValues = {
    email : string,
    password : string
}



export type InputProps = {
    label: string;
    name: string;
    type: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  