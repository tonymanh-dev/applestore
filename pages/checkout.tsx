import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { selectCartItems } from '../redux/CartSlice'
import Button from '../components/Button'

const Checkout = () => {
  const [groupItems, setGroupItems] = useState(
    {} as { [key: string]: Product[] }
  )
  const items = useSelector(selectCartItems)
  const router = useRouter()

  //   useEffect(() => {
  //     const totalItems = items.reduce((res, item) => {
  //       ;([res[item._id]] = res[item._id] || []).push(item)
  //       return res
  //     }, {} as { [key: string]: Product[] })
  //     setGroupItems(totalItems)
  //   }, [items])

  const isItem = items.length
  return (
    <div>
      <Head>
        <title>Bag - Apple</title>
      </Head>
      <Navbar />

      <main className="px-4 pt-10 md:px-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {isItem > 0
              ? 'Check the contents of your bag.'
              : 'There is no product in your bag.'}
          </h1>
          <p className="text-gray-700 ">
            All orders are delivered with free shipping.
          </p>

          {isItem === 0 && (
            <Button
              title="Continue shopping"
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {isItem > 0 && <div></div>}
      </main>
    </div>
  )
}

export default Checkout
