import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

const API = axios.create({
    baseURL: 'http://localhost:8080',
});

function returnUser() {
    const {authData} = useAuth();
    return authData ? JSON.stringify(authData) : undefined;
}

export default API;