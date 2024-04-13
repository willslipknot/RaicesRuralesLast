import { createContext, useContext, useState } from "react"
import { createCondRequest, updateCondRequest, deleteCondRequest, getCondRequest, getCondsRequest, getimgRequest } from '../api/cond'


const condContext = createContext();

export const useCond = () => {
    const context = useContext(condContext);

    if (!context) {
        throw new Error("useCond must be used whitin a TaskProvider")
    }
    return context;
}

export function CondProvider({ children }) {

    const [conds, setConds] = useState([]);

    const getConds = async () => {
        try {
            const res = await getCondsRequest();
            setConds(res.data)
            console.log(res)

        } catch (error) {
            console.error(error)
        }

    }

    const getimg = async () => {
        try {
            const res = await getimgRequest();
            setActs(res.data.image)
            console.log(res)

        } catch (error) {
            console.error(error)
        }

    }

    const getContConds = async () => {
        try {
            const res = await getCondsRequest();
            setConds(res.data);
    
            const numCond = res.data.length;
            console.log(`Número de datos recibidos: ${numCond}`);
            setConds(numCond);
        } catch (error) {
            console.error(error);
        }
    }

    const createConds = async (cond) => {
        const res = await createCondRequest(cond)
        console.log(res)
    }

    const deleteCond = async (id) => {
        try {
            const res = await deleteCondRequest(id)
            if (res.status == 200) setConds(conds.filter(cond => cond.id !== id))
            console.log(res)
        } catch (error) {
            console.error(error)
        }

    }

    const getCond = async (id) => {
        const res = await getCondRequest(id)
        return res.data
    }

    const updateCond = async (id, cond) => {
        try {
            const res = await updateCondRequest(id, cond);
            if (res.status === 200) {
                setConds(prevConds => {
                    return prevConds.map(prevCond => {
                        if (prevCond.id === id) {
                            return { ...prevCond, ...cond };
                        }
                        return prevCond;
                    });
                });
            }
            console.log(res);
        } catch (error) {
            console.error('Error al actualizar la condición:', error);
        }
    };

    return (
        <condContext.Provider value={{
            conds,
            createConds,
            getConds,
            deleteCond,
            getCond,
            updateCond,
            getContConds,
            getimg,

        }}>
            {children}
        </condContext.Provider>
    );
}