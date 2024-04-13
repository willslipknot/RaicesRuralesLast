import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Conductor.css';
import NavBar from '../components/Home/NavBar.jsx';
import { useCond } from '../context/condContext';
import { useVehiculo } from '../context/vehiculoContext.jsx';
import CondCard from '../components/UserLog/CondCard';
import VehCard from '../components/UserLog/VehCard.jsx';

const opciones = [
    { label: 'Moto', value: 'Moto' },
    { label: 'Carro', value: 'Carro' },

];

function Conductor() {
    const { register, handleSubmit, reset } = useForm();
    const { createConds, getConds, conds } = useCond();
    const { getVeh, createVehiculos, vehiculos, getVehiculos } = useVehiculo();

    const [clase, setClase] = useState('');
    const [file, setFile] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [mostrarConductores, setMostrarConductores] = useState(true)
    const [mostrarVehiculos, setMostrarVehiculos] = useState(false)

    const [vehiculoSel, setVehiculoSel] = useState('');
    const [vehiculo, setVehiculo] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [nombreArchivo1, setNombreArchivo1] = useState('');

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenModal1 = () => {
        setModalOpen1(true);
    };

    const handleCloseModal1 = () => {
        setModalOpen1(false);
    };

    const handleMostrarConductores = () => {
        setMostrarConductores(true)
        setMostrarVehiculos(false)
    }

    const handleMostrarVehiculos = () => {
        setMostrarVehiculos(true)
        setMostrarConductores(false)
    }

    const handleTipoVehChange = async (e) => {
        const selectedTipVeh = e.target.value;
        setClase(selectedTipVeh);
        setVehiculo(null);

        if (selectedTipVeh) {
            try {
                const vehiculosData = await getVeh(selectedTipVeh);
                const formattedVehiculos = vehiculosData.map((vehiculoData) => ({
                    label: vehiculoData.placa,
                    value: vehiculoData.placa,
                }));
                setVehiculo(formattedVehiculos);
            } catch (error) {
                console.error('Error al obtener vehiculos:', error);
            }
        }
    }

    const handleVehiculoChange = (e) => {
        setVehiculoSel(e.target.value);
        console.log(e.target.value);
    };

    const handleImagenChange = (e) => {
        setFile(e.target.files[0])
    }

    const onSubmit = handleSubmit((data) => {
        if (!file) {
            alert('Debes subir un archivo')
            return
        }

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('apellido', data.apellido);
        formData.append('licencia', data.licencia);
        formData.append('vehiculo', data.vehiculo);
        formData.append('clase', data.clase);
        formData.append('foto', file);

        console.log("Datos del formulario:", data);

        createConds(formData);

        setMensaje('Conductor creado exitosamente');
        reset();

        setTimeout(() => {
            setMensaje('');
        }, 3000);
    });

    const onSubmit1 = handleSubmit((data) => {
        if (!file) {
            alert('Debes subir un archivo')
            return
        }

        const formData = new FormData();
        formData.append('placa', data.placa);
        formData.append('marca', data.marca);
        formData.append('linea', data.linea);
        formData.append('modelo', data.modelo);
        formData.append('clase', data.clase);
        formData.append('cilindrada', data.cilindrada);
        formData.append('color', data.color);
        formData.append('carroceria', data.carroceria);
        formData.append('combustible', data.combustible);
        formData.append('propietario', data.propietario);
        formData.append('identificacion', data.identificacion);
        formData.append('num_ident', data.num_ident);
        formData.append('imagenes', file);

        console.log("Datos del formulario:", data);

        createVehiculos(formData);

        setMensaje('Vehiculo creado exitosamente');
        reset();

        setTimeout(() => {
            setMensaje('');
        }, 3000);
    });

    const handleLimpiarClick = () => {
        reset();
        setMensaje('');
    };

    useEffect(() => {
        getConds(),
            getVehiculos()
    }, [])

    return (
        <div className="conductor-container">
            <NavBar />
            <div className="conductor-buttons2">
                <button onClick={handleOpenModal}>Crear Conductor</button>
            </div>

            <div className="vehiculo-buttons">
                <button onClick={handleOpenModal1}>Crear Vehiculo</button>
            </div>

            <div className="conductor-buttons1">
                <button onClick={handleMostrarConductores}>Ver Conductores</button>
            </div>

            <div className="vehiculo-buttons1">
                <button onClick={handleMostrarVehiculos}>Ver Vehiculos</button>
            </div>

            <div className="conductor-content">
                {mostrarConductores && (
                    <div className='cards'>{
                        conds.map((cond) => (
                            <CondCard key={cond.id} cond={cond} />
                        ))
                    }
                    </div>
                )}

                {mostrarVehiculos && (
                    <div className='cards'>{
                        vehiculos.map((veh) => (
                            <VehCard key={veh.id} veh={veh} />
                        ))
                    }
                    </div>
                )}

                {modalOpen && (
                    <div className="modal" onClick={handleCloseModal}>
                        <div className="conductor-form" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={onSubmit} className='conductor'>

                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" className='formulario' {...register("nombre", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input type="text" className='formulario'  {...register("apellido", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="licencia">Licencia</label>
                                    <input type="text" className='formulario'  {...register("licencia", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="clase">Tipo Vehiculo</label>&nbsp;&nbsp;
                                    <select {...register('clase', { required: true })} onChange={handleTipoVehChange} type="text" className='formulario-tipo' value={clase} >
                                        <option value="">Selecciona un tipo</option>
                                        {opciones.map((clase, i) => (
                                            <option key={clase.value} value={clase.value}>
                                                {clase.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="vehiculo">Placa Vehiculo</label>&nbsp;&nbsp;
                                    <select {...register('vehiculo', { required: true })} className='formulario-tipo' onChange={handleVehiculoChange} value={vehiculo ? vehiculo.value : ''}>
                                        <option value="">Seleccione la placa</option>
                                        {vehiculo && vehiculo.map((vehiculoItem, index) => (
                                            <option key={vehiculoItem.value} value={vehiculoItem.value}>
                                                {vehiculoItem.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group-image">
                                    <input id='inputFile' type="file" onChange={handleImagenChange} className='formulario1' />
                                    <input type="text" value={nombreArchivo} hidden className='formulario' {...register("foto")} />
                                </div>


                                <div className="form-group">
                                    <button type='submit'>Crear</button>
                                    <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                </div>

                                {mensaje && <div className="mensaje">{mensaje}</div>}
                            </form>
                        </div>
                    </div>
                )}

                {modalOpen1 && (
                    <div className="modal" onClick={handleCloseModal1}>
                        <div className="vehiculo-form" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={onSubmit1} className='vehiculo'>
                                <div className="form-columns">
                                    <div className="col1">
                                        <div className="form-group">
                                            <label htmlFor="placa">Placa</label>
                                            <input type="text" className='formulario' {...register("placa", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="marca">Marca</label>
                                            <input type="text" className='formulario'  {...register("marca", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="linea">Linea</label>
                                            <input type="text" className='formulario'  {...register("linea", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="modelo">Modelo</label>
                                            <input type="text" className='formulario' {...register("modelo", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cilindrada">Cilindrada</label>
                                            <input type="text" className='formulario'  {...register("cilindrada", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="color">Color</label>
                                            <input type="text" className='formulario'  {...register("color", { required: true })} />
                                        </div>
                                    </div>

                                    <div className="col2">
                                        <div className="form-group">
                                            <label htmlFor="clase">Clase</label>&nbsp;&nbsp;
                                            <select {...register('clase', { required: true })} onChange={handleTipoVehChange} type="text" className='formulario-tipo' value={clase} >
                                                <option value="">Selecciona un tipo</option>
                                                {opciones.map((clase) => (
                                                    <option key={clase.value} value={clase.value}>
                                                        {clase.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="carroceria">Carroceria</label>
                                            <input type="text" className='formulario' {...register("carroceria", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="combustible">Combustible</label>
                                            <input type="text" className='formulario'  {...register("combustible", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="propietario">Propietario</label>
                                            <input type="text" className='formulario'  {...register("propietario", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <input type="text" value={'CC'} className='formulario' hidden {...register("identificacion", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="num_ident">N. Identificacion</label>
                                            <input type="text" className='formulario'  {...register("num_ident", { required: true })} />
                                        </div>

                                        <br></br>
                                        <div className="form-group-image">
                                            <input id='inputFile' type="file" onChange={handleImagenChange} className='formulario1' />
                                            <input type="text" value={nombreArchivo1} hidden className='formulario' {...register("imagenes")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type='submit'>Crear</button>
                                    <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                </div>

                                {mensaje && <div className="mensaje">{mensaje}</div>}
                            </form>
                        </div>
                    </div>

                )
                }
            </div >
        </div >
    );
}

export default Conductor;
