import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSearch } from '../redux/reducers/products'

const SearchProduct = () => {
  const dispatch = useDispatch()

  const search = (e) => {
    const { value } = e.target
    dispatch(updateSearch(value))
  }
  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        placeholder="search product"
        onChange={search}
        className="w-1/2 h-12 outline-none rounded-lg shadow-outline text-xl text-gray-600"
         />
    </div>
  )
}

export default SearchProduct