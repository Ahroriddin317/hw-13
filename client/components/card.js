import React from 'react'
import { useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Card = ({ id, title, image, price, rates, base, selection }) => {
  const dispatch = useDispatch()
  const { pathname } = window.location
  const symbols = {
    'USD': '$',
    'EUR': 'E',
    'CAD': 'C'
  }
  return (
    <div
      className="card m-8 max-w-sm rounded overflow-hidden shadow-lg flex flex-col w-64"
    >
      <div className="flex justify-center">
        <img className="card__image h-32 object-cover w-full" src={image} alt={title} />
      </div>
      <div className="card__title mb-2 mt-2" >{title} </div>
      <div className="px-6">
        <p className="card__price">
          {(price * (rates[base] || 1)).toFixed(2)} {symbols[base] || 'E'}{' '}
        </p>
        {selection[id] > 0 && pathname === '/basket' && <p className="product__total_price" >{((price * selection[id]) * (rates[base] || 1)).toFixed(2)} {symbols[base] || 'E'}{' '}</p>}
      </div>

      <div className="flex p-10 justify-between px-6 py-4">
        <button
          type="button"
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={() => {
            dispatch(removeSelection(id))
          }}
        >
          -
              </button>
        <div className="product__amout" >{selection[id] || 0}</div>
        {pathname !== '/basket' && <button
          type="button"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            dispatch(addSelection(id))
          }}
        >
          +{' '}
        </button>}
      </div>
    </div>
  )
}

export default Card
