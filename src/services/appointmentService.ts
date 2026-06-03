import { supabase } from "../utils/supabase";
import type { Appointment } from "../types/appointment";

export const createAppointment = async ( payload: Appointment ) => {
    console.log(payload)
    return await supabase 
        .from('appointments')
        .insert(payload)

}