import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/CondCard.css';
import { useCond } from '../../context/condContext';
import { useVehiculo } from '../../context/vehiculoContext.jsx';

const opciones = [
    { label: 'Moto', value: 'Moto' },
    { label: 'Carro', value: 'Carro' }
];

function CondCard({ cond }) {

    const [modalOpen, setModalOpen] = useState(false);
    const { deleteCond, getCond, updateCond } = useCond();
    const { getVeh } = useVehiculo();

    const [selectedId, setSelectedId] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [tip, setTip] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [vehiculoSel, setVehiculoSel] = useState('');
    const [vehiculo, setVehiculo] = useState(null);
    const [clase, setClase] = useState('');

    useEffect(() => {
        if (selectedId !== null) {
            async function loadCond() {
                const cond = await getCond(selectedId);
                console.log(cond);
                setValue('nombre', cond.nombre);
                setValue('apellido', cond.apellido);
                setValue('licencia', cond.licencia);
                setValue('vehiculo', cond.vehiculo);
                setValue('clase', cond.clase);
            }
            loadCond();
        }
    }, [selectedId]);

    const rutaImagen = '/src/assets/images/' + cond.foto;



    const handleOpenModal = () => {
        setSelectedId(cond.id);
        setModalOpen(true);

    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log("Datos del formulario:", data);
        if (selectedId !== null) {
            try {
                await updateCond(selectedId, data);
                setMensaje('Conductor editado exitosamente');
                handleCloseModal();
            } catch (error) {
                console.error('Error al editar el conductor:', error);
            }
        }
        setTimeout(() => {
            setMensaje('');
        }, 3000);

        window.location.reload();

    });
    const handleLimpiarClick = () => {
        reset();
        setMensaje('');
    };

    useEffect(() => {
        const cargarVehiculos = async () => {
            if (cond.clase === 'Moto') {
                const selectedTipVeh = 'Moto';
                setClase(selectedTipVeh);

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

            if (cond.clase === 'Carro') {
                const selectedTipVeh = 'Carro';
                setClase(selectedTipVeh);

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
        };

        cargarVehiculos();
    }, [cond.clase]);


    const handleTipoVehChange = async (e) => {

        const selectedTipVeh = e.target.value;
        setClase(selectedTipVeh);

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

    return (
        <div className="card">
            <div className='title'>
                <img className='imagen_p1' src={rutaImagen} alt="Imagen" />
                <div>
                    <h1>Nombre: {cond.nombre} {cond.apellido}</h1>
                    <p>Tipo: {cond.clase}</p>
                    <p>Placas: {cond.vehiculo}</p><br />
                    <div className='botones'>
                        <p className='buttons'>
                            <button onClick={handleOpenModal}>Editar</button>&nbsp;
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
                                                <input type="text" className='formulario' {...register("apellido", { required: true })} />
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

                                            <div className="form-group">
                                                <button type='submit'>Editar</button>
                                                <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                            </div>

                                            {mensaje && <div className="mensaje">{mensaje}</div>}
                                        </form>
                                    </div>
                                </div>
                            )}
                        </p>
                        <p className='buttons1'><button onDoubleClick={() => {
                            deleteCond(cond.id);
                            window.location.reload();
                        }}>Eliminar</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CondCard;
