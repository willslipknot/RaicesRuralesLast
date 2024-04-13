import React, { useEffect, useState } from 'react';
import NavBar from '../components/Home/NavBar.jsx';
import { useAuth } from '../context/authContext.jsx';
import '../assets/css/Profile.css';
import { useForm, Controller } from 'react-hook-form';

function Profile() {
    const { user, updateUser } = useAuth();
    const { handleSubmit, control, reset } = useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        reset({
            username: user.username || '',
            correo: user.correo || '',
            telefono: user.telefono || '',
            nombre: user.nombre || '',
            apellido: user.apellido || '',
        });
    }, [user, reset]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            console.log(data)
            await updateUser(user.id, data);
            setIsEditing(false);
            window.location.reload();
            
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    return (
        <div className="profile-container">
            <NavBar /><br /><br /><br /><br />
            <div className="profile-form">
                <h1>Perfil de Usuario</h1><br></br>
                <form onSubmit={handleSubmit(onSubmit)} className='perfil'>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input type="text" {...field} readOnly={!isEditing} />}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <Controller
                            name="correo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input type="email" {...field} readOnly={!isEditing} />}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <Controller
                            name="telefono"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input type="text" {...field} readOnly={!isEditing} />}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <Controller
                            name="nombre"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input type="text" {...field} readOnly={!isEditing} />}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <Controller
                            name="apellido"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input type="text" {...field} readOnly={!isEditing} />}
                        />
                    </div>
                    {isEditing ? (
                        <div className="form-group">
                            <button type="submit">Actualizar</button>
                            <button type="button" onClick={handleCancelClick}>Cancelar</button>
                        </div>
                    ) : (
                        <button type="button" onClick={handleEditClick}>Editar</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Profile;
