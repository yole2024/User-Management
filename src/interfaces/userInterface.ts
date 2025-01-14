export interface IUser {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
}

export interface IUserMeta {
    _id: string;
    username: string;
    fullName: string;
    email: string;
}

export interface IUserAdding {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

export interface IUserValidate {
    // _id?: string;
    username: string;
    fullName: string;
    email: string;
    password: string; 
}

export interface IAdmin {
    _id: string;
    username: string;
    name: string;
    email: string;
    token?: string | null;    
};