import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password, firstName, lastName) => {
    const {data} = await $host.post('api/user/registration', {email: email, password: password, firstName: firstName, lastName: lastName,  role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email: email, password: password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    try{
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        console.error(e);
    }
    
}

export const checkRole = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token).role
}

export const getUserById = async (userId) => {
    try {
        const {data} = await $authHost.get(`api/exact/${userId}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const {data} = await $authHost.get('api/user/all');
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUserById = async (userId) => {
    try {
        await $authHost.delete(`api/user/delete/${userId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};