import { createContext, useContext, useState } from "react"
import { getReservaRequest, getReservasRequest } from '../api/reservas'


const reservaContext = createContext();

export const useReserva = () => {
    const context = useContext(reservaContext);

    if (!context) {
        throw new Error("useReserva must be used whitin a TaskProvider")
    }
    return context;
}

export function ReservaProvider({ children }) {

    const [reservas, setReservas] = useState([]);

    const getReservas = async () => {
        try {
            const res = await getReservasRequest();
            const reservasOrdenadas = res.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

            return reservasOrdenadas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };



    const getFechaReservas = async () => {
        try {
            const res = await getReservasRequest();
            const fechaActual = new Date().toISOString().split('T')[0];
            const reservasDelDia = res.data.filter((reserva) => reserva.fecha === fechaActual);

            return reservasDelDia;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getReserva = async (id) => {
        const res = await getReservaRequest(id)
        return res.data
    }

    const getContReserva = async () => {
        try {
            const res = await getReservasRequest();
            const fechaActual = new Date().toISOString().split('T')[0];
            const reservasDelDia = res.data.filter((reserva) => reserva.fecha === fechaActual);

            const numReservas = reservasDelDia.length;
            console.log(`Número de reservas para el día actual: ${numReservas}`);
            setReservas(numReservas)

            return numReservas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getTopActivities = async () => {
        try {
            const res = await getReservasRequest();
            const reservasOrdenadas = res.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

            return reservasOrdenadas;
        } catch (error) {
            console.error(error);
            throw error;
        }
      };
      


    return (
        <reservaContext.Provider value={{
            reservas,
            getReserva,
            getReservas,
            getFechaReservas,
            getContReserva,
            getTopActivities
        }}>
            {children}
        </reservaContext.Provider>
    );
}