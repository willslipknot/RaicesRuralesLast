import React, { useState, useEffect } from 'react';
import { useReserva } from '../context/reservaContext';
import '../assets/css/Reservas.css';

function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [reservasFecha, setReservasFecha] = useState([]);
    const { getReservas, getFechaReservas } = useReserva();
    const [mostrarReservas, setMostrarReservas] = useState(true)
    const [mostrarDia, setMostrarDia] = useState(false)

    const handleMostrarReservas = () => {
        setMostrarReservas(true)
        setMostrarDia(false)
    }

    const handleMostrarDia = () => {
        setMostrarDia(true)
        setMostrarReservas(false)
    }


    useEffect(() => {
        const obtenerReservasDesdeBD = async () => {
            try {
                const data = await getReservas();
                setReservas(data);
                console.log('Respuesta de getReservas:', data);
            } catch (error) {
                console.error('Error al obtener reservas:', error);
            }
        };

        const obtenerReservasFechaDesdeBD = async () => {
            try {
                const data = await getFechaReservas();
                setReservasFecha(data);
                console.log('Respuesta de getReservas:', data);
            } catch (error) {
                console.error('Error al obtener reservas:', error);
            }
        };

        obtenerReservasDesdeBD();
        obtenerReservasFechaDesdeBD();
    }, [getReservas, getFechaReservas]);

    return (
        <div className='tablaRes'>
            <div className="buttons3">
                <button onClick={handleMostrarReservas} >Historico Reservas</button>
            </div>
            <div className="buttons2">
                <button onClick={handleMostrarDia} >Reservas del dia</button>
            </div>
            <br /><br/>
            {mostrarReservas && (
                <table>
                <thead>
                    <tr className='trTabla'>
                        <th>Actividad</th>
                        <th>Conductor</th>
                        <th>Vehiculo</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserv) => (
                        <tr key={reserv.id}>
                            <td>{reserv.nom_act}</td>
                            <td>{reserv.conductor}</td>
                            <td>{reserv.vehiculo}</td>
                            <td>{reserv.fecha}</td>
                            <td>{reserv.hora}</td>
                            <td>{reserv.cliente}</td>
                            <td>{reserv.correo}</td>
                            <td>{reserv.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}

            {mostrarDia && (
                <table>
                <thead>
                    <tr className='trTabla'>
                        <th>Actividad</th>
                        <th>Conductor</th>
                        <th>Vehiculo</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasFecha.map((reservF) => (
                        <tr key={reservF.id}>
                            <td>{reservF.nom_act}</td>
                            <td>{reservF.conductor}</td>
                            <td>{reservF.vehiculo}</td>
                            <td>{reservF.fecha}</td>
                            <td>{reservF.hora}</td>
                            <td>{reservF.cliente}</td>
                            <td>{reservF.correo}</td>
                            <td>{reservF.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )
            }
            
        </div>
    );
}

export default Reservas;
