import { useEffect, useState } from 'react';
import NavBar from '../components/Home/NavBar.jsx'
import '../assets/css/Home.css';
import { useActs } from '../context/actContext.jsx'
import { useCond } from '../context/condContext.jsx'
import { useVehiculo } from '../context/vehiculoContext.jsx';
import { useReserva } from '../context/reservaContext.jsx';
import { BsFilePersonFill, BsGeoAltFill, BsFillBellFill, BsRocketFill } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function DashboardAdmin() {

    const { getContActs, acts } = useActs();
    const { getContConds, conds } = useCond();
    const { getContVehiculos, vehiculos } = useVehiculo();
    const { getContReserva, reservas, getTopActivities } = useReserva();
    const [datosGrafico, setDatosGrafico] = useState([]);
    const [datosGrafico1, setDatosGrafico1] = useState([]);
    const [date, setDate] = useState(new Date());

    const obtenerColorPorIndice = (index) => {
        const colores = ['#FFC0CB', '#DDA0DD', '#7B68EE', '#7FFFD4', '#90EE90'];
        return colores[index % colores.length];
    };

    const contarActividades = async () => {
        try {
            const registros = await getTopActivities();

            const contadorActividades = {};

            registros.forEach((registro) => {
                const nombreActividad = registro.nom_act;

                if (contadorActividades[nombreActividad]) {
                    contadorActividades[nombreActividad]++;
                } else {
                    contadorActividades[nombreActividad] = 1;
                }
            });

            const data = Object.keys(contadorActividades)
                .map((nombre, index) => ({
                    name: nombre,
                    cantidad: contadorActividades[nombre],
                    fill: obtenerColorPorIndice(index),
                }))
                .sort((a, b) => b.cantidad - a.cantidad)
                .slice(0, 5);

            setDatosGrafico(data);

            console.log('Contador de actividades:', contadorActividades);
            console.log('Datos para el gráfico:', data);
        } catch (error) {
            console.error(error);
        }
    };

    const contarConductores = async () => {
        try {
            const registros = await getTopActivities();
            const contadorConductores = {};

            registros.forEach((registro) => {
                const nombreConductor = registro.conductor;

                if (contadorConductores[nombreConductor]) {
                    contadorConductores[nombreConductor]++;
                } else {
                    contadorConductores[nombreConductor] = 1;
                }
            });

            const data = Object.keys(contadorConductores)
                .map((nombre, index) => ({
                    name: nombre,
                    cantidad: contadorConductores[nombre],
                    fill: obtenerColorPorIndice(index),
                }))
                .sort((a, b) => b.cantidad - a.cantidad)
                .slice(0, 5);

            setDatosGrafico1(data);

            console.log('Contador de actividades:', contadorConductores);
            console.log('Datos para el gráfico:', data);
        } catch (error) {
            console.error(error);
        }
    };

    const onChange = (newDate) => {
        setDate(newDate);
    };

    useEffect(() => {
        const miniMapContainer = document.getElementById('miniMap');
        
        if (miniMapContainer && !miniMapContainer._leaflet_id) {
          const miniMap = L.map('miniMap').setView([4.8486111111111, -74.620555555556], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(miniMap);
        }
      }, []);
      
    useEffect(() => {
        getContActs();
        getContConds();
        getContVehiculos();
        getContReserva();
        contarActividades();
        contarConductores();
    }, []);

    return (
        <div>
            <NavBar />
            <br></br><br></br>
            <main className='main-container'>

                <div className='main-cards'>
                    <div className='card'>
                        <a href="Actividades">
                            <div className='card-inner'>
                                <h3>Actividades</h3>
                                <BsGeoAltFill className='card_icon' />
                            </div>
                        </a>
                        <h1>{acts}</h1>

                    </div>
                    <div className='card'>
                        <a href="Conductores">
                            <div className='card-inner'>
                                <h3>Conductores</h3>
                                <BsFilePersonFill className='card_icon' />
                            </div>
                        </a>
                        <h1>{conds}</h1>

                    </div>
                    <div className='card'>
                        <a href="Conductores">
                            <div className='card-inner'>
                                <h3>Vehiculos</h3>
                                <BsRocketFill className='card_icon' />
                            </div>
                        </a>
                        <h1>{vehiculos}</h1>

                    </div>

                    <div className='card'>
                        <a href="Reservas">
                            <div className='card-inner'>
                                <h3>Reservas</h3>
                                <BsFillBellFill className='card_icon' />
                            </div>
                        </a>
                        <h1>{reservas}</h1>
                    </div>
                </div>

                <div className='charts0'>
                    <Calendar
                        className={'calendario'}
                        onChange={onChange}
                        value={date}
                        tileDisabled={({ date }) => date.getDate() === new Date().getDate()}
                    />    

                <div id="miniMap" className='minimapa'></div>
                </div>

                <div className='charts'>
                    <ResponsiveContainer width="105%" height={290}>
                        <h2>Top 5 Actividades</h2>
                        <br></br>
                        <BarChart
                            data={datosGrafico}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Bar dataKey="cantidad" fill="white" />
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={290} >
                        <h2>Top 5 Conductores </h2>
                        <br></br>
                        <BarChart
                            data={datosGrafico1}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Bar dataKey="cantidad" fill="white" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <br></br><br></br>
            </main>
        </div>
    );
}

export default DashboardAdmin;
