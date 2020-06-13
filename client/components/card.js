import React from 'react'
import { useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Card = ({ id, title, image, price, rates, base, selection }) => {
  const dispatch = useDispatch()
  const symbols = {
    'USD': '$',
    'EUR': 'E',
    'CAD': 'C'
  }
  return (
    <div
      className="border-2 flex flex-col border-solid border-black w-64 h-64 p-2 m-4"
    >
      <div className="flex justify-center">
        <img className="h-32" src={image} alt={title} />
      </div>
      <div>{title} </div>
      <div>
        {(price * (rates[base] || 1)).toFixed(2)} {symbols[base] || 'E'}{' '}
        {selection[id] > 0 && <p>{(price * selection[id]).toFixed(2)}</p>}
      </div>

      <div className="flex p-10 justify-between">
        {' '}
        <button
          type="button"
          onClick={() => {
            dispatch(removeSelection(id))
          }}
        >
          -
              </button>
        <div>{selection[id] || 0}</div>
        <button
          type="button"
          onClick={() => {
            dispatch(addSelection(id))
          }}
        >
          +{' '}
        </button>{' '}
      </div>
    </div>
  )
}

export default Card
