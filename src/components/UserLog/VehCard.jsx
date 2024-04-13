import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/CondCard.css';
import { useVehiculo } from '../../context/vehiculoContext.jsx';

const opciones = [
    { label: 'Moto', value: 'Moto' },
    { label: 'Carro', value: 'Carro' }
];

function VehCard({ veh }) {

    const [modalOpen, setModalOpen] = useState(false);
    const { deleteVehiculo, getVehiculo, updateVehiculo } = useVehiculo();

    const [selectedId, setSelectedId] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (selectedId !== null) {
            async function loadVeh() {
                const veh = await getVehiculo(selectedId);
                console.log(veh);
                setValue('placa', veh.placa);
                setValue('marca', veh.marca);
                setValue('linea', veh.linea);
                setValue('modelo', veh.modelo);
                setValue('clase', veh.clase);
                setValue('cilindrada', veh.cilindrada);
                setValue('color', veh.color);
                setValue('carroceria', veh.carroceria);
                setValue('combustible', veh.combustible);
                setValue('propietario', veh.propietario);
                setValue('identificacion', veh.identificacion);
                setValue('num_ident', veh.num_ident);
            }
            loadVeh();
        }
    }, [selectedId]);

    const rutaImagen = '/src/assets/images/' + veh.imagenes;



    const handleOpenModal = () => {
        setSelectedId(veh.id);
        setModalOpen(true);

    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLimpiarClick = () => {
        reset();
        setMensaje('');
    };


    return (
        <div className="card">
            <div className='title'>
                <img className='imagen_p1' src={rutaImagen} alt="Imagen" />
                <div>
                    <h1>Marca: {veh.marca} </h1>
                    <p>Color {veh.color}</p>
                    <p>Modelo: {veh.modelo} </p>
                    <p>Placa: {veh.placa}</p>
                    <p>Propietario: {veh.propietario}</p>

                    <div className='buttons1'>
                        <button onDoubleClick={() => {
                            deleteVehiculo(veh.id);
                            window.location.reload();
                        }}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehCard;
