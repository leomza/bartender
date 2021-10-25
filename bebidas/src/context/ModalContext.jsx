import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

//Creo el Context:
export const ModalContext = createContext()

const ModalProvider = props => {
  //State del Provider:
  //Primero guardo el Id al que el usuario le de click (como valor inicial no va a haber ninguna seleccionada por lo que sera "null")
  const [idReceta, guardarIdReceta] = useState(null)
  const [informacion, guardarReceta] = useState({})

  //Una vez que tengo una receta en Activo, realizo una llamada a la API:
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return //Como la primera vez no habrá receta hago este "if" que no retorne nada

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
      const resultado = await axios.get(url)
      guardarReceta(resultado.data.drinks[0])
    }
    obtenerReceta()
  }, [idReceta]) //Cada vez que cambie el Id de la receta se llamará a la API

  return (
    <ModalContext.Provider
      value={{
        informacion,
        guardarIdReceta,
        guardarReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
