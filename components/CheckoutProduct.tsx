import React from 'react'
import Image from 'next/image'
import { urlFor } from '../sanity'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../redux/CartSlice'
import toast from 'react-hot-toast'

interface IProps {
  items: Product[]
  id: string
}

const CheckoutProduct = ({ id, items }: IProps) => {
  const dispatch = useDispatch()

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart({ id }))

    toast.error(`${items[0].title} removed from cart 😎`, {
      position: 'top-center',
    })
  }

  return (
    <div className="flex w-full flex-col items-start pb-10 md:flex-row md:items-center md:pb-0">
      <div className="relative mr-8 h-48 w-48">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex w-full items-center justify-between ">
        <div className="flex flex-col items-start space-x-0 space-y-2 text-lg font-medium  md:flex-row md:items-center md:space-x-10">
          <h4>{items[0].title}</h4>
          <p className="flex items-center ">
            {items.length}
            <ChevronDownIcon className="ml-2 h-5 w-5 text-blue-500" />
          </p>
        </div>

        <div className="flex flex-col items-end space-y-4 text-lg font-medium ">
          <h4>
            {items
              .reduce((total, item) => (total += item.price), 0)
              .toLocaleString('en-US')}{' '}
            yen
          </h4>
          <button
            onClick={handleRemoveItem}
            type="button"
            className="text-sm text-blue-500 hover:opacity-80"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
