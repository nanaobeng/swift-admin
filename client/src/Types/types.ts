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
  

  export type userTypeProps = {
    id : number
}

export type dashboardSummaryProps = {
 available_properties: number | undefined,
 pending_inquiries: number | undefined,
 pending_tasks : number | undefined,
 matching_properties: {} | undefined
 
}
