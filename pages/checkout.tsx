import React, { useState, useEffect } from 'react'
import Stripe from 'stripe'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import Navbar from '../components/Navbar'
import Button from '../components/Button'
import CheckoutProduct from '../components/CheckoutProduct'
import { selectCartItems, selectCartTotal } from '../redux/CartSlice'
import { fetchPostJSON } from '../utils/api-helpers'
import getStripe from '../utils/getStripe'
import { currencyFormat } from '../utils'

const Checkout = () => {
  const [loading, setLoading] = useState(false)
  const [groupItems, setGroupItems] = useState(
    {} as { [key: string]: Product[] }
  )
  const items = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const router = useRouter()

  // Handle group item
  useEffect(() => {
    const handleGroupItems = items.reduce((results, item) => {
      ;(results[item._id] = results[item._id] || []).push(item)
      return results
    }, {} as { [key: string]: Product[] })

    setGroupItems(handleGroupItems)
  }, [items])

  //  Handle checkout with Stripe
  const handleCheckout = async () => {
    setLoading(true)

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      '/api/checkout_sessions',
      {
        items: items,
      }
    )

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return
    }

    // Redirect to checkout
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    })

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)

    setLoading(false)
  }

  const isItem = items.length

  return (
    <div>
      <Head>
        <title>Ordering - Apple store</title>
      </Head>
      <Navbar />

      <main className="px-4 pt-10 md:px-20">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold ">
            {isItem > 0
              ? 'Check the contents of your bag.'
              : 'There is no product in your bag.'}
          </h1>
          <p className="pb-4 text-gray-700">
            All orders are delivered with free shipping.
          </p>

          {isItem === 0 && (
            <Button
              title="Continue shopping"
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {isItem > 0 && (
          <div>
            {Object.entries(groupItems).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}

            <div className="ml-auto w-full max-w-3xl py-10 pt-6 ">
              <div className=" border-t border-gray-200">
                <div className="space-y-2 py-6">
                  <div className="flex w-full items-center justify-between ">
                    <p>Subtotal </p>
                    <p className="font-medium">
                      {currencyFormat(
                        items.reduce((total, item) => (total += item.price), 0)
                      )}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between  ">
                    <p>Shipping</p>
                    <p className="font-medium uppercase">Free</p>
                  </div>
                  <div className="flex items-center justify-between ">
                    <span className="flex flex-col md:flex-row">
                      <p>Estimated tax for:</p>
                      <p className="ml-0 flex cursor-pointer items-center text-blue-500 md:ml-2">
                        Enter zip code{' '}
                        <ChevronDownIcon className="ml-2 h-5 w-5" />
                      </p>
                    </span>
                    <p>$ -</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 py-6 text-lg font-semibold ">
                  <h4>Total</h4>
                  <h4>{currencyFormat(cartTotal)}</h4>
                </div>
                <div className="text-right text-sm ">
                  <p className="text-xs text-gray-600">
                    14,982 yen including consumption tax
                  </p>
                  <p className="cursor-pointer text-blue-500 hover:underline">
                    Apply for the 0% split fee plan here. Conditions apply.
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-10">
                <h1 className="text-lg font-medium">How do you buy?</h1>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 text-center md:grid-cols-2">
                <div className="flex flex-col justify-between space-y-6 rounded-lg bg-purple-50 p-8 ">
                  <p className=" text-center text-lg font-medium">
                    Pay Deferred Payment Plan 0% fee installment payment
                    exclusively for Apple 4,577 yen (tax included)
                    /monthMonthlyfootnote
                  </p>

                  <Button title="Buy in installments" padding="py-4" />
                </div>
                <div className="flex flex-col justify-between space-y-6 rounded-lg bg-purple-50 p-8">
                  <p className=" text-center text-lg font-medium">
                    Pay with other methods such as card, ApplePay, Orico Loan{' '}
                    {currencyFormat(cartTotal)} (tax included)
                  </p>

                  <Button
                    loading={loading}
                    onClick={handleCheckout}
                    padding="py-4"
                    title="Go to order producedure"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
