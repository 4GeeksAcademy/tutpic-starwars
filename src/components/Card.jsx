import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Card = ({ name = "", uid = null, subj = "" }) => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const [isFavorite, setIsFavorite] = useState(false)

    //FUNCION QUE AÑADE A LISTA DE FAVORITOS

    const addFavorite = () => {
        setIsFavorite(p => !p)

        isFavorite ?
            dispatch({
                type: "delete-fav",
                payload: { uid: uid, subj: subj }
            }) :
            dispatch({
                type: "add-favorite",
                payload: { uid: uid, name: name, subj: subj }
            })
    }

    //EFECT QUE REVISA SI EL ELEMENTO ES FAVORITO

    useEffect(() => {
        setIsFavorite(false)
        for (let ele of store.favorites) {
            if (ele.subj == subj) {
                if (ele.uid == uid) {
                    setIsFavorite(true)
                    break
                }
            }
        }
    }, [store.favorites])

    return (
        <div style={{ minWidth: "400px" }} className="card m-2 container-flex" >
            <img src="https://placehold.co/400x200" alt="placeholder" style={{ height: 200 + "px", width: 400 + "px" }} className="card-img-top" />
            <div className="card-body">
                <a className="card-title p-3 fs-2" style={{textDecoration:"none"}}>{name}</a>
                <div className="d-flex justify-content-between px-3">
                    <button className="btn btn-primary" onClick={()=>navigate(`./${subj}/${uid}`)}>Más informacion</button>
                    <button className={`btn btn-${isFavorite ? "danger" : "warning"}`} onClick={addFavorite}><i className="fa-solid fa-star"></i> </button>
                </div>
            </div>
        </div>
    )
}

export default Card