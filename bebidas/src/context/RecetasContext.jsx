import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

//Creo el Context
export const RecetasContext = createContext()

const RecetasProvider = props => {
  const [recetas, guardarRecetas] = useState([])
  const [busqueda, buscarRecetas] = useState({
    nombre: '',
    categoria: ''
  })
  const [consultar, guardarConsultar] = useState(false)

  //Cada vez que aprete "Buscar", haré una nueva consulta a la API y traerá nueva información
  useEffect(() => {
    //Si consultar es "true", se ejecuta la funcion
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`
        const resultado = await axios.get(url)
        guardarRecetas(resultado.data.drinks)
      }
      obtenerRecetas()
    }
  }, [busqueda])

  return (
    <RecetasContext.Provider
      value={{ buscarRecetas, guardarConsultar, recetas }}
    >
      {props.children}
    </RecetasContext.Provider>
  )
}

export default RecetasProvider
