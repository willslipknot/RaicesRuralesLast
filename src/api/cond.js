import supabase from "../db1.js";

export const getConds = async (req, res) => {
    try {
        const { data: conductores, error } = await supabase
            .from('conductores')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.json(conductores);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const getCond = async (req, res) => {
    try {
        const { data: conductor, error } = await supabase
            .from('conductores')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!conductor) {
            return res.status(404).json(["No existe el conductor"]);
        }

        res.json(conductor);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const createCond = async (req, res) => {
    const { nombre, apellido, licencia, vehiculo, clase } = req.body;
    const { filename: foto } = req.file;

    if (!foto) {
        return res.status(400).json(["Debes subir una imagen"]);
    }

    try {
        const { data: newConductor, error } = await supabase
            .from('conductores')
            .insert([
                { nombre, apellido, licencia, vehiculo, clase, foto }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Conductor creado correctamente");
        res.json({ message: "Conductor creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const deleteCond = async (req, res) => {
    try {
        const { error } = await supabase
            .from('conductores')
            .delete()
            .eq('id', req.params.id);

        if (error) {
            throw new Error(error.message);
        }

        res.json({ message: "Conductor eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const putCond= async (req, res) => {
    try {
        const { error } = await supabase
            .from('conductores')
            .update(req.body)
            .eq('id', req.params.id);

        if (error) {
            throw new Error(error.message);
        }

        res.json({ message: "Conductor actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}
