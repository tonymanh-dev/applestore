import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../redux/CartSlice'

const Cart = () => {
  const items = useSelector(selectCartItems)
  return (
    <Link href="/checkout">
      <div className="fixed right-10 bottom-10 z-[99] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-gray-200 shadow">
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-sm font-medium text-gray-100 ">
            {items.length}
          </span>
        )}
        <span className="text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default Cart
