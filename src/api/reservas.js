import supabase from "../db1.js";

export const getReservas = async (req, res) => {
    try {
        const { data: reservas, error } = await supabase
            .from('reservas')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}

export const getReserva = async (req, res) => {
    try {
        const { data: reserva, error } = await supabase
            .from('reservas')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!reserva) {
            return res.status(404).json(["No existe la Reserva"]);
        }

        res.json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
}
