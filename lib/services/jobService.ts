import { Job } from "../../types/job";
import { supabase } from "../supabase";

export const jobService = {
    get,
    add,
    subscribe,
    getLocations
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

async function getLocations() {
    const { data, error } = await supabase
        .from("jobs")
        .select('location')
        
        
    if (error) {
        throw error;
    }
    console.log(data , "locations")
    return new Set(data.map((item : any) => item.location))
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

async function subscribe(callback : (data : Job[]) => void) {
    
const channels = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'jobs' },
  (payload) => {
    console.log('Change received!', payload)
    callback(payload as any)
  }
)
.subscribe()
}
