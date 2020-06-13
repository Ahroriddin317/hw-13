import React from 'react'
import { useSelector } from 'react-redux'
import { getBasketProducts, willSort, sumSelection } from '../redux/reducers/products'
import Card from './card'

const Basket = () => {
  const list = useSelector(s => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const sortProducts = useSelector(s => s.products.sortProducts)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const basketCards = getBasketProducts(list, selection)
  const sum = sumSelection(selection, rates, base, list)
  willSort(basketCards, sortProducts)
  return (
    <div className="flex flex-wrap content-center justify-center">
      {basketCards.map((card) => {
        return (
          <Card key={card.id} {...card} rates={rates} base={base} selection={selection} />
        )
      })}
      <p id='total-amount'>{`total amount ${sum}`}</p>
    </div>
  )
}

export default Basket