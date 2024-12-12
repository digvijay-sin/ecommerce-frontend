import axios from 'axios';
import {API_BASE_URL} from './config.js'

export const postUser = (user) => {
    axios.post(API_BASE_URL + '/user/addUser', user.uid)
    .then(response => console.log("Use Added: ", response.data)) 
    .catch(error => console.log("Error: ", error));
}