import React from 'react'
import { useSelector } from 'react-redux'
import { willSort } from '../redux/reducers/products'
import Card from './card'

const Cards = () => {
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const sortProducts = useSelector(s => s.products.sortProducts)

  willSort(list, sortProducts)
  return (
    <div className="flex flex-wrap content-center justify-center">
      {list.map((card) => {
        return (
          <Card key={card.id} {...card} rates={rates} base={base} selection={selection} />
        )
      })}
    </div>
  )
}

export default Cards
