import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState([])

	//FUNCION QUE BORRA FAVORITO

	const deleteFav = (uid, subj) => {
		dispatch({
			type: "delete-fav",
			payload: { uid: uid, subj: subj }
		})
	}

	//FUNCION QUE EVITA QUE SE REFRESQUE LA PAGINA AL HACER SUBMIT

	const submitHandler = (e) => {
		e.preventDefault()
		setSearch("")
		if (searchResults.length == 0) {
			alert("No se encontro ningun elemento, intente de nuevo")
			return
		}
		let found = searchResults[0]
		navigate(`/${found.subj}/${found.uid}`)
	}

	//EFFECT QUE BUSCA RESULTADOS BASADO EN SEARCH Y LOS METE EN SEARCHRESULT

	useEffect(() => {
		let allPeople = store.peopleList.list.map(ele => {
			return { ...ele, subj: "people" }
		})
		let allVehicles = store.vehiclesList.list.map(ele => {
			return { ...ele, subj: "vehicles" }
		})
		let allPlanets = store.planetsList.list.map(ele => {
			return { ...ele, subj: "planets" }
		})
		let allNames = [...allPeople, ...allVehicles, ...allPlanets]
		let results = allNames.filter((ele) => ele.name.toLowerCase().includes(search.toLowerCase()))
		setSearchResults(results.toSpliced(6))
	}
		, [search])
	return (

		<nav className="navbar bg-body-tertiary m-0 p-0">
			<div className="container-fluid">
				<a className="navbar-brand" onClick={() => navigate("./")} style={{ cursor: "pointer" }}><img style={{ height: 2 + "em" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1041px-Star_Wars_Logo.svg.png" alt="star wars logo" /></a>
				<form className="d-flex flex-row mx-5" onSubmit={submitHandler}>
						<input list="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
						<button type="submit" className="btn btn-primary"><i className="fa-solid fa-magnifying-glass"></i></button>
						<datalist id="search">
							{searchResults.length > 0 && searchResults.map((ele, indx) => {
								return (
									<option key={indx} value={ele.name}></option>
								)
							})}
						</datalist>
					</form>
				<div className="dropstart flex-row d-flex justify-content-between" >
					<div>
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Favoritos</button>
						<ul className="dropdown-menu">
							{store.favorites.length > 0 ? store.favorites.map((ele, indx) => {
								return (
									<li key={indx} style={{ cursor: "pointer" }} className="dropdown-item d-flex justify-content-between align-items-center">
										<a onClick={() => navigate(`./${ele.subj}/${ele.uid}`)}>{ele.name}</a>
										<button className="btn btn-danger" onClick={() => deleteFav(ele.uid, ele.subj)}>
											<i className="fa-solid fa-trash">
											</i></button></li>
								)
							}) :
								<li className="dropdown-item">No hay favoritos</li>
							}
						</ul>
					</div>
				</div>
			</div>
		</nav>



	);
};