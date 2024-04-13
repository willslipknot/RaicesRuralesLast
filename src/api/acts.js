import supabase from "../db1.js";

export const getActs = async (req, res) => {
    try {
        const { data: actividades, error } = await supabase
            .from('actividades')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.json(actividades);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const getAct = async (req, res) => {
    try {
        const { data: actividad, error } = await supabase
            .from('actividades')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!actividad) {
            return res.status(404).json(["No existe la actividad"]);
        }

        res.json(actividad);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const createAct = async (req, res) => {
    const { nombre, direccion, descripcion, tipo } = req.body;
    const { filename: imagen } = req.file;

    if (!imagen) {
        return res.status(400).json(["Debes subir una imagen"]);
    }

    try {
        const { data: newActividad, error } = await supabase
            .from('actividades')
            .insert([
                { nombre, direccion, descripcion, tipo, imagen }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Actividad creada correctamente");
        res.json({ message: "Actividad creada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const deleteAct = async (req, res) => {
    try {
        const { data: actividad, error } = await supabase
            .from('actividades')
            .delete()
            .eq('id', req.params.id);

        if (error) {
            throw new Error(error.message);
        }

        if (!actividad) {
            return res.status(405).json(["No existe la actividad, por lo que no se eliminó nada"]);
        }

        res.json({ message: "Actividad eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const putAct = async (req, res) => {
    try {
        const { error } = await supabase
            .from('actividades')
            .update(req.body)
            .eq('id', req.params.id);

        if (error) {
            throw new Error(error.message);
        }

        res.json({ message: "Actividad actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}
