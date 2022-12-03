import {API} from '../../config';
import { AuthValues } from '../../Types/types';


export const login = ({email , password} : AuthValues) => {

    const body = {email,password}
    return fetch(`${API}/auth/login`, {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': "application/json"
        },
        body:JSON.stringify(body)
    })
    .then(response => {
        
        return response.json()
        
    })
    .catch(err => {
        console.log(err)
    })
  }