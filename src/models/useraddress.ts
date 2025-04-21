import { Gender } from "../enums/gender";

export interface Useraddress{
    id: string;
    user_id:string,
    gender_owner:Gender,
    address_name:string,
    house_image:string,
    google_link_map:string,
    address_description:string,
    village:string,
    city:string,
    tel:string,
}