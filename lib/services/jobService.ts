import { Job } from "../../types/job";
import { supabase } from "../supabase";

export const jobService = {
    get,
    add,
}

async function get() {
    const { data, error } = await supabase
        .from("jobs")
        .select("*")
    if (error) {
        throw error;
    }
    return data as Job[]
}

async function add(job: Job) {
    const { data, error } = await supabase
        .from("jobs")
        .insert([job])
    if (error) {
        console.log(error , "error")
        throw error;
    }
    console.log("job added")
}
