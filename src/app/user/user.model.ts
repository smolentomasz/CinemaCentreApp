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

export interface Login{
    email: string;
    token: string;
    userType: string;
    name: string;
    surname: string;
}
