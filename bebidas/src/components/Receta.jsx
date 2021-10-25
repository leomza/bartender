import React, { useContext, useState } from 'react'
import { ModalContext } from '../context/ModalContext'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

//Estilos para el Modal:
function getModalStyle () {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const Receta = ({ receta }) => {
  //Configuracion del Modal de Material-UI:
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //Extraigo los valores de Modal Context:
  const { guardarIdReceta, informacion, guardarReceta } = useContext(
    ModalContext
  )

  //Muestra y formatea los ingredientes para mostrarlos en el Modal:
  const mostrarIngredientes = (informacion) => {
      let ingredientes = [];
      //Cada ingrediente empieza desde el 1 por eso "i=1" y es hasta 16 ya que termina en el 15
      for(let i = 1; i < 16; i++){
          //Tengo que chequear que el elemento del array no este vacio:
        if (informacion[`strIngredient${i}`] ) {
            //Si existe voy agregandolo a los ingredientes (ingredientes y cantidades):
            ingredientes.push(
                <li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
            )
        }
      }
      return ingredientes;
  }

  return (
    <div className='col-md-4 mb-3'>
      <div className='card'>
        <h2 className='card-header'>{receta.strDrink}</h2>
        <img
          className='card-img-top'
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />
        <div className='card-body'>
          <button
            type='button'
            className='btn btn-block btn-primary'
            onClick={() => {
              guardarIdReceta(receta.idDrink)
              //Una vez que se cierre el modal "guardarReceta" vuelve a ser un objeto vacio
              guardarReceta({})
              handleOpen()
            }}
          >
            Ver Receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              guardarIdReceta(null)
              handleClose()
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{informacion.strDrink}</h2>
              <h3 className='mt-4'>Instrucciones de Preparación</h3>
              <p>{informacion.strInstructions}</p>
              <img
                className='img-fluid my-4'
                src={informacion.strDrinkThumb}
                alt=''
              />
              <h3>Ingredientes y Cantidades</h3>
              <ul>
                  {mostrarIngredientes(informacion)}
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Receta
