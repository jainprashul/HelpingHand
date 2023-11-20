export interface User {
    id : string;
    email: string;
    password?: string;
    name: string;

}

export interface Profile  extends User {
    skills: string[];
    avatar: string;
    address: string;
    city: string;
    phone: string;
    bio?: string;
}