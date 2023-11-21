import { ObjectReference } from "./dataObject";

export interface Job {
    readonly created_at?: any;
    id: string;
    title: string;
    timestamp : number;
    price: number;
    description: string;
    tags?: string[];
    skills: string[];
    createdBy: string;
    createdByName: string;
    location: string;
    contact: string;
}