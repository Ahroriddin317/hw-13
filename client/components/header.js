import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBase, sumSelection, sortPrice, sortName } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)

  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = sumSelection(selection, rates, base, list)

  const changeSortProducts = (e) => {
    e.preventDefault()
    const { id } = e.target
    if (id === 'sort-price') {
      dispatch(sortPrice())
    }
    if (id === 'sort-name') {
      dispatch(sortName())
    }
  }
  return (
    <div className="flex">
      <div className="flex-auto text-700 ml-20">
        <Link className="mr-8" id="brand-name" to="/">
          Home
        </Link>
        <Link to="/basket" className="mr-8" >basket</Link>
        <Link to="/logs">logs</Link>
      </div>
      <div>
        {['CAD', 'USD', 'EUR'].map((it) => {
          return (
            <button
              key={it}
              type="button"
              className={`mx-4 ${base === it ? 'underline' : ''}`}
              onClick={() => {
                dispatch(setBase(it))
              }}
            >
              {it}
            </button>
          )
        })}
      </div>
      <div className="flex-auto text-700">
        {['sort price', 'sort name'].map(sort => {
          return (
            <button key={sort} type="button" id={sort === 'sort price' ? 'sort-price' : 'sort-name'} className="mr-8" onClick={changeSortProducts}>
              {sort}
            </button>
          )
        })}
      </div>
      <div>
        <p>{sum !== 0 && sum}</p>
        <p>{numberOfItems !== 0 && numberOfItems}</p>
      </div>
    </div>
  )
}

export default Header
