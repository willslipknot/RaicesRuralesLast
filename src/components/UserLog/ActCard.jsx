import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/ActCard.css';
import { useActs } from '../../context/actContext'; 

const opciones = [
    { label: 'Estadia', value: 'Estadia' },
    { label: 'Alimentacion', value: 'Alimentacion' },
    { label: 'Actividad', value: 'Actividad' },
];

function ActCard({ act }) {

    const [modalOpen, setModalOpen] = useState(false);
    const { deleteAct, getAct, updateAct} = useActs()
    const [selectedId, setSelectedId] = useState(null);
    const { register, handleSubmit, reset,setValue } = useForm();
    const [tip, setTip] = useState('');
    const [file, setFile] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [mensaje, setMensaje] = useState('');
    

    useEffect(() => {
        if (selectedId !== null) {
            async function loadAct() {  
                const act = await getAct(selectedId);
                console.log(act);
                setValue('nombre', act.nombre);
                setValue('direccion', act.direccion);
                setValue('descripcion', act.descripcion);
                setValue('tipo', act.tipo);
                setValue('imagen', act.imagen)
            }
            loadAct();
        }
    }, [selectedId]);
    
    const rutaImagen = '/src/assets/images/'+ act.imagen;

    const handleOpenModal = () => {
        setSelectedId(act.id);
        setModalOpen(true);
        
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const onSubmit = handleSubmit((data) => {
        console.log("Datos del formulario:", data);
        
        if (selectedId !== null){
            updateAct(selectedId, data)
        
        setMensaje('Actividad editada exitosamente');

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

    const handleTipoChange = (e) => {
        setTip(e.target.value);
    };

    const handleImagenChange = (e) => {
        const files = (e.target.files[0]);
        setNombreArchivo(files.name);
        
        if (files) {
            setFile(files);
        }
    };


    return (
        <div className="card">
            <div className='title'>
                <img className='imagen_p1' src={rutaImagen} alt="Imagen" />
                <div>
                    <h1>Nombre: {act.nombre}</h1>
                    <p>Tipo: {act.tipo}</p><br />
                    <div className='buttons'>
                        <button onClick={handleOpenModal}>Editar</button>&nbsp;
                        {modalOpen && (
                            <div className="modal" onClick={handleCloseModal}>
                                <div className="actividad-form" onClick={(e) => e.stopPropagation()}>
                                    <form onSubmit={onSubmit} className='actividad'>

                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" className='formulario' {...register("nombre", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="direccion">Direccion</label>
                                            <input type="text" className='formulario'  {...register("direccion", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="descripcion">Descripcion</label>
                                            <textarea className="area" rows="3" {...register("descripcion", { required: true })} ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tipo">Tipo</label>&nbsp;&nbsp;
                                            <select {...register('tipo', { required: true })} onChange={handleTipoChange} type="text" className='formulario-tipo' >
                                                <option value="">Selecciona un tipo</option>
                                                {opciones.map((opcion) => (
                                                    <option key={opcion.value} value={opcion.value}>
                                                        {opcion.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group-image">
                                            <input type="file" onChange={handleImagenChange} className='formulario1' />
                                            <input type="text" value={nombreArchivo} hidden className='formulario' {...register("imagen")} />
                                        </div>

                                        <div className="form-group">
                                            <button type='submit'onClick={handleSubmit}>Editar</button>
                                            <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                        </div>

                                        {mensaje && <div className="mensaje">{mensaje}</div>}
                                    </form>
                                </div>
                            </div>
                        )}

                        <button onDoubleClick={() => {
                            deleteAct(act.id);
                            window.location.reload();
                        }}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActCard;
