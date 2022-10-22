import React from 'react'
import Image from 'next/image'
import { urlFor } from '../sanity'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartSlice'
import toast from 'react-hot-toast'

interface IProps {
  product: Product
}

const CardProduct = ({ product }: IProps) => {
  const dispath = useDispatch()

  const handleAddItemToCart = () => {
    dispath(addToCart(product))

    toast.success(`${product.title} added to cart 🦄`, {
      position: 'top-center',
    })
  }

  return (
    <div className="select-one flex h-fit w-[320px] flex-col space-y-3 rounded-xl bg-neutral-800 p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          //   width={400}
          //   height={400}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-1 items-center justify-between space-x-3 ">
        <div className="space-y-2">
          <p className="font-medium tracking-wide text-gray-100">
            {product.title}
          </p>
          <p className="text-sm text-gray-300">
            {product.price.toLocaleString('en-US')} yen (tax included)
          </p>
        </div>

        <div
          onClick={handleAddItemToCart}
          className="flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-gray-100 hover:scale-110 md:h-[60px] md:w-[60px]"
        >
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CardProduct
