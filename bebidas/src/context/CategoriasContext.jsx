//Los datos fluiran desde este archivo (ya no tanto desde "App.js" como solia hacerse)
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

//Creo el Context
export const CategoriasContext = createContext()

//Siempre que creo el Context debo crear el Provider que es de donde saldrán los state(datos) y las funciones
//Siempre es una Arrow Function y siempre se le pasan Props (como se utiliza Context en un lugar, se hace referencia a los componente hijos llamando a props.children)
const CategoriasProvider = props => {
  const [categorias, guardarCategorias] = useState([])

  //Ejecuto el llamado a la API (como quiero que solo se ejecute una vez al cargar, pongo en las dependencias que este):
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
      const categorias = await axios.get(url)
      guardarCategorias(categorias.data.drinks)
    }
    obtenerCategorias()
  }, [])

  //Lo que esta dentro del "return" es todo lo que estará disponible para los diferentes componentes:
  //Por lo que uso la referencia del Context creado (CategoriasContext)
  //Todo lo que se ponga en "value" sera lo que estará disponible en los demas Componentes
  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasContext.Provider>
  )
}

//Debo exportar por default a CategoriasProvider para hacerlo disponible en los demas componentes
export default CategoriasProvider
