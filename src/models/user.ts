import { Gender } from "../enums/gender";
import { Status } from "../enums/status";

export interface UserModel {
    id: number,
    first_name: string ,
    username: string;
    user: User;
    last_name: string,
    email: string,
    tel: string,
    password: string,
    address: string,
    gender: Gender,
    cv: string, 
    avatar: string,
    cat_id: string,
    cat_name: string;
    price: string,
    status: Status,
    created_at: string,
    updated_at: string 
}

export interface User {
    id: string;
    username: string
}