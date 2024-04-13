import { createContext, useContext, useState } from "react";
import { createVehiculoRequest, updateVehiculoRequest, deleteVehiculoRequest, getVehiculoRequest, getVehiculosRequest, getVehRequest } from '../api/vehiculos'


const VehiculoContext = createContext();

export const useVehiculo = () => {
    const context = useContext(VehiculoContext);

    if (!context) {
        throw new Error("useVehiculo must be used whitin a TaskProvider")
    }
    return context;
}

export function VehiculoProvider({ children }) {

    const [vehiculos, setVehiculos] = useState([]);


    const getVehiculos = async () => {
        try {
            const res = await getVehiculosRequest();
            setVehiculos(res.data)
            console.log(res)

        } catch (error) {
            console.error(error)
        }

    }

    const getVeh = async (clase) => {
        const res = await getVehRequest(clase)
        return res.data
  
    }

    const getContVehiculos = async () => {
        try {
            const res = await getVehiculosRequest();
            setVehiculos(res.data);
    
            const numVehiculo = res.data.length;
            console.log(`Número de datos recibidos: ${numVehiculo}`);
            setVehiculos(numVehiculo);
        } catch (error) {
            console.error(error);
        }
    }

    const createVehiculos = async (vehiculo) => {
        const res = await createVehiculoRequest(vehiculo)
        console.log(res)
    }

    const deleteVehiculo = async (id) => {
        try {
            const res = await deleteVehiculoRequest(id)
            if (res.status == 200) setVehiculos(vehiculos.filter(vehiculo => vehiculo.id !== id))
            console.log(res)
        } catch (error) {
            console.error(error)
        }

    }

    const getVehiculo = async (id) => {
        const res = await getVehiculoRequest(id)
        return res.data
    }

    const updateVehiculo = async (id, vehiculo) => {
        try {
            const res = await updateVehiculoRequest(id, vehiculo);
            if (res.status === 200) {
                setVehiculos(prevVehiculos => {
                    return prevVehiculos.map(prevVehiculo => {
                        if (prevVehiculo.id === id) {
                            return { ...prevVehiculo, ...vehiculo };
                        }
                        return prevVehiculo;
                    });
                });
            }
            console.log(res);
        } catch (error) {
            console.error('Error al actualizar el Vehiculo:', error);
        }
    };

    return (
        <VehiculoContext.Provider value={{
            vehiculos,
            createVehiculos,
            getVehiculos,
            deleteVehiculo,
            getVehiculo,
            updateVehiculo,
            getContVehiculos,
            getVeh,

        }}>
            {children}
        </VehiculoContext.Provider>
    );
}