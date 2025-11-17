import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import Card from "./Card.jsx"

const Characters = () => {

    const { store, dispatch } = useGlobalReducer()

    const [currentPage, setCurrentPage] = useState(1)

    //FUNCION QUE CAMBIA A PAGINA ANTERIOR

    const prevPage = () => {
        if (store.characterList.prevUrl) {
            setCurrentPage(p => p - 1)
        }
    }

    //FUNCION QUE CAMBIA A PAGINA SIGUIENTE

    const nextPage = () => {
        if(store.characterList.nextUrl) {
            setCurrentPage(p => p + 1)
        }
    }

    //EFFECT QUE LLAMA LISTA DE PERSONAJES

    useEffect(() => {

        const getCharacters = async () => {
            try {
                let response = await fetch(`https://www.swapi.tech/api/people?page=${currentPage}&limit=10`)
                if (!response.ok) {
                    throw new Error("error getCharacters")
                }
                let data = await response.json()
                dispatch({
                    type: "set-character-list",
                    payload: data
                })
            } catch (error) {
                console.error(error)
            }
        }
        getCharacters()
    }, [currentPage])

    return (
        <div className="d-flex flex-row" style={{ overflow: "scroll" }}>
            {store.characterList.prevUrl && <button className="btn btn-tertiary" style={{ minHeight: "100%" }} onClick={prevPage}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>}
            {store.characterList.list.length > 0 && store.characterList.list.map((ele) => {
                return (
                    <Card key={ele.uid} uid={ele.uid} name={ele.name} url={ele.url} />
                )
            })}
             {store.characterList.nextUrl && <button className="btn btn-tertiary" style={{ minHeight: "100%" }} onClick={nextPage}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>}
        </div>
    )
}

export default Characters