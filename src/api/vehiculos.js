import supabase from "../db1.js";

export const getVehiculos = async (req, res) => {
    try {
        const { data: vehiculos, error } = await supabase
            .from('vehiculos')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.json(vehiculos);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const getVehiculo = async (req, res) => {
    try {
        const { data: vehiculo, error } = await supabase
            .from('vehiculos')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!vehiculo) {
            return res.status(404).json(["No existe el Vehiculo"]);
        }

        res.json(vehiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const createVehiculo = async (req, res) => {
    const { placa, marca, linea, modelo, cilindrada, color, clase, carroceria, combustible, propietario, identificacion, num_ident } = req.body;
    const { filename: imagenes } = req.file;

    if (!imagenes) {
        return res.status(400).json(["Debes subir una imagen"]);
    }

    try {
        const { data: newVehiculo, error } = await supabase
            .from('vehiculos')
            .insert([
                { placa, marca, linea, modelo, cilindrada, color, clase, carroceria, combustible, propietario, identificacion, num_ident, imagenes }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Vehiculo creado correctamente");
        res.json({ message: "Vehiculo creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const deleteVehiculo = async (req, res) => {
    try {
        const { error } = await supabase
            .from('vehiculos')
            .delete()
            .eq('id', req.params.id);

        if (error) {
            throw new Error(error.message);
        }

        res.json({ message: "Vehiculo eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const putVehiculo = async (req, res) => {
    try {
        const { error } = await supabase
            .from('vehiculos')
            .update(req.body)
            .eq('id', req.params.id);

        if (error) {
            throw new Error(error.message);
        }

        res.json({ message: "Vehiculo actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const getVeh = async (req, res) => {
    const { clase } = req.params;
    try {
        const { data: vehiculos, error } = await supabase
            .from('vehiculos')
            .select('*')
            .eq('clase', clase);

        if (error) {
            throw new Error(error.message);
        }

        if (vehiculos.length === 0) {
            return res.status(404).json({ message: "No existen vehiculos para la clase proporcionada." });
        }

        res.json(vehiculos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener vehiculos por clase.' });
    }
};
