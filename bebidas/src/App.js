import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';

/* En este proyecto se usa useContext: "Permite pasar el state o funciones desde el componente principal a los hijos, sin necesidad de pasarlo por cada componente".
Context no reemplaza a Props, ya que si el proyecto es sencillo es mejor usar Props, ya que Context lleva crear mas archivos y escribir codigo.
Context hace un poco mas complicada la reutlizacion de componentes.
*/

function App() {
  return (
    //Siempre el Context que usaré en varios componentes lo coloco en el arbol de los componentes (que incluya todo)
    <CategoriasProvider>
      <RecetasProvider>
        <Header />
        <div className="container mt-5">
          <div className="row">
            <Formulario />
          </div>
        </div>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
