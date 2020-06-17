import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBasketProducts, willSort, cleanSELECTION } from '../redux/reducers/products'
import Card from './card'

const Basket = () => {
  const dispatch = useDispatch()
  const list = useSelector(s => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const sortProducts = useSelector(s => s.products.sortProducts)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const basketCards = getBasketProducts(list, selection)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  willSort(basketCards, sortProducts)
  return (
    <div>
      <div className="flex flex-wrap content-center justify-center">
        {basketCards.map((card) => {
          return (
            <Card key={card.id} {...card} rates={rates} base={base} selection={selection} />
          )
        })}
      </div>
      <div className="flex flex-wrap content-center justify-center items-center my-2">
        <p id='total-amount' className="mr-8 text-2xl font-semibold text-gray-600">{`total amount: ${numberOfItems}`}</p>
        <button type="button" className="bg-indigo-500 px-4 py-2 text-white  rounded-lg shadow-lg uppercase tracking-wider font-semibold" onClick={() => dispatch(cleanSELECTION())}>
          clean basket
        </button>
      </div>
    </div>
  )
}

export default Basket