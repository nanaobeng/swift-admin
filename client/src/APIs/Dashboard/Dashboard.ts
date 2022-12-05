import {API} from '../../config';
import { userTypeProps } from '../../Types/types';


export const getDashboardSummary = ({id}:userTypeProps) => {
   const body = {id};
    return fetch (`${API}/analytics/dashboard/summary`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': "application/json"
           
        },
        body:JSON.stringify(body)
    })
    .then(response => {
        return response.json();
    })

    .catch(err => console.log(err))
};
