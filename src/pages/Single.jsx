import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Single = () => {
  const { store } = useGlobalReducer()
  const { subj, uid } = useParams()
  const [currentData, setCurrentData] = useState({})
  const [keys, setKeys] = useState([])
  const navigate = useNavigate()

  //EFFECT QUE RECAUDA INFORMACION DEL SUJETO (subj) CON SU ID (uid)

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(`https://www.swapi.tech/api/${subj}/${uid}`)
        if (!response.ok) {
          throw new Error("getData no OK")
        }
        let data = await response.json()
        setCurrentData(data.result.properties)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  //EFFECT QUE ACTUALIZA LAS PROPIEDADES DEL SUJETO SELECCIONADO

  useEffect(() => {
    setKeys(Object.getOwnPropertyNames(currentData))
  }, [currentData])

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{currentData.name}</h1>
      <div className="d-flex justify-content-around">
        <img src="https://placehold.co/800x600" alt="placeholder 800x600" style={{maxWidth:"40%"}}/>
        <p style={{maxWidth:"40%"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="d-flex flex-row-reverse m-1" style={{ minHeight: "fit-content", overflow: "scroll" }}>
        {keys.length > 0 && keys.map((ele, indx) => {
          if (!Array.isArray(currentData[ele]) && !currentData[ele].includes("https")) {
            var keyName = ele.replace("_", " ")
            keyName = keyName[0].toUpperCase() + keyName.slice(1)
            return (
              <div key={indx} className="d-flex flex-column m-3 justify-content-center border border-secondary" style={{ minWidth: "max-content", minHeight: "fit-content" }}>
                <div className="d-flex justify-content-center align-items-center flex-column p-0">
                  <h5 className=" p-1 m-0" style={{ minWidth: "100%", height: "50%" }}>{keyName}</h5>
                  <h5 className="border-top border-tertiary p-1 text-center m-0" style={{ minWidth: "100%", height: "50%" }}>{currentData[ele]}</h5>
                </div>
              </div>
            )
          }
        })}
      </div>
      <button className="btn btn-primary" onClick={()=>{navigate("/")}} style={{maxWidth:"max-content"}}>Volver</button>
    </div>
  );
};

export default Single


