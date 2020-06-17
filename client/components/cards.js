import React from 'react'
import { useSelector } from 'react-redux'
import { willSort } from '../redux/reducers/products'
import Card from './card'
import SearchProduct from './searchProduct'

const Cards = () => {
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const sortProducts = useSelector(s => s.products.sortProducts)
  const searchWord = useSelector(s => s.products.search)
  willSort(list, sortProducts)
  const searchResult = list.filter(product => product.title.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0)
  return (
    <div>
      <SearchProduct />
      <div className="flex flex-wrap content-center justify-center">
        {(searchResult.length > 0 || searchWord !== '' ? searchResult : list).map((card) => {
          return (
            <Card key={card.id} {...card} rates={rates} base={base} selection={selection} />
          )
        })}
      </div>
    </div>
  )
}

export default Cards
