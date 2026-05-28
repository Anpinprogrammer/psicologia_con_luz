import { useState } from "react";
import { createAppointment } from "../services/appointmentService";
import type { Appointment } from "../types/appointment";

export const useAppointments = () => {

    const [loading, setLoading] = useState(false)

    const create = async ( payload : Appointment ) => {

        setLoading(true)

        const { data, error } = await createAppointment(payload)

        setLoading(false)

        return {
            data,
            error
        }
    }

    return {
        create,
        loading
    }

}