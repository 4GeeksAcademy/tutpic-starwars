import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import Card from "./Card.jsx"

const Listas = ({ subj, list }) => {

    const { store, dispatch } = useGlobalReducer()

    const [currentPage, setCurrentPage] = useState(1)

    //FUNCION QUE CAMBIA A PAGINA ANTERIOR

    const prevPage = () => {
        if (list.prevUrl) {
            setCurrentPage(p => p - 1)
        }
    }

    //FUNCION QUE CAMBIA A PAGINA SIGUIENTE

    const nextPage = () => {
        if (list.nextUrl) {
            setCurrentPage(p => p + 1)
        }
    }

    //EFFECT QUE LLAMA LISTA DE PERSONAJES

    useEffect(() => {

        const getList = async () => {
            const cachedData = localStorage.getItem(`${subj}${currentPage}`);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData); 
                dispatch({
                    type: `set-${subj}-list`,
                    payload: parsedData
                });
                return;
            }
            try {
                let response = await fetch(`https://www.swapi.tech/api/${subj}?page=${currentPage}&limit=10`)
                if (!response.ok) {
                    throw new Error("error getList", subj)
                }
                let data = await response.json()
                dispatch({
                    type: `set-${subj}-list`,
                    payload: data
                })
                localStorage.setItem(`${subj}${currentPage}`, JSON.stringify(data))
            } catch (error) {
                console.error(error)
            }
        }
        getList()
    }, [currentPage])

    return (
        <div className="d-flex flex-row" style={{ overflow: "scroll" }}>
            {list.prevUrl && <button className="btn btn-tertiary" style={{ minHeight: "100%" }} onClick={prevPage}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>}
            {list.list.length > 0 && list.list.map((ele) => {
                return (
                    <Card key={ele.uid} uid={ele.uid} name={ele.name} subj={subj} />
                )
            })}
            {list.nextUrl && <button className="btn btn-tertiary" style={{ minHeight: "100%" }} onClick={nextPage}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>}
        </div>
    )
}

export default Listas