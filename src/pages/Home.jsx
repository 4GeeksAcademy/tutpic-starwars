import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Listas from "../components/Listas.jsx";

const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div>
			<h1>Personajes</h1>
			<Listas subj={"people"} list={store.peopleList}/>
			<h1>Planetas</h1>
			<Listas subj={"planets"} list={store.planetsList}/>
			<h1>Vehículos</h1>
			<Listas subj={"vehicles"} list={store.vehiclesList}/>
		</div>
	);
}; 

export default Home