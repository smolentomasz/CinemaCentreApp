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
    userType: string;
    name: string;
    surname: string;
}

export interface LoginResponse{
    token: string;
}
