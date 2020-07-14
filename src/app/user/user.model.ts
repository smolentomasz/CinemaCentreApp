export interface UserLogin{
    email: string;
    password: string;
}

export interface UserRegistry{
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface User{
    email: string;
    role: string;
    unique_name: string;
    family_name: string;
}

export interface EditUser{
    name: string;
    surname: string;
    newPassword: string;
    oldPassword: string;
}

export interface LoginResponse{
    token: string;
}

export interface DeleteResponse{
    responseMessage: string;
}
