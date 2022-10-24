import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { GetServerSideProps } from 'next'
import { useMediaQuery } from 'react-responsive'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Button from '../components/Button'
import { currencyFormat } from '../utils/index'
import { appleBlack, logo } from '../utils/contants'
import { fetchLineItems } from '../utils/fetchLineItems'

interface IProps {
  products: StripeProduct[]
}

const Success = ({ products }: IProps) => {
  const [mounted, setMounted] = useState(true)
  const [orderDetail, setOrderDetail] = useState(false)
  const { data: session } = useSession()

  const router = useRouter()
  const { session_id } = router.query

  // Calculate subtoal of each product
  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  )

  // Get value TRUE by when screen smaller 768px
  const isMediumScreen = useMediaQuery({ query: '(max-width: 768px)' })

  //
  const isShowOrderDetail = isMediumScreen ? orderDetail : true

  const handleShowOrderDetail = () => {
    setOrderDetail((prev) => !prev)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="">
      <Head>
        <title>Order successfully - Apple</title>
      </Head>
      <header className="flex px-4 pt-4 md:hidden">
        <Link href="/">
          <div className="trasition relative h-16 w-8 cursor-pointer">
            <Image src={appleBlack} layout="fill" objectFit="contain" />
          </div>
        </Link>
      </header>

      <main className="grid h-full w-full grid-cols-1 overflow-hidden pb-10 md:h-screen md:grid-cols-12 md:pb-0">
        <section className="col-span-1 px-6 py-6 md:col-span-7 lg:px-10">
          <div className="trasition relative mb-2 hidden h-16 w-8 cursor-pointer md:block">
            <Image src={appleBlack} layout="fill" objectFit="contain" />
          </div>
          <div className="flex items-center justify-start space-x-4">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
            <div className="">
              <p className="cursor-pointer text-sm hover:text-blue-500 hover:underline">
                Order #{session_id?.slice(-10)}
              </p>
              <h4 className="text-lg font-medium">
                Thank you {session ? session.user?.name : 'Guest'}
              </h4>
            </div>
          </div>
          <div className="mt-4 space-y-6">
            <div className="space-y-4 divide-y rounded-lg border border-gray-300 p-4">
              <div>
                <h4 className="mb-2 font-medium">Your order is confirmed</h4>
                <p className="text-sm">
                  We’ve accepted your order, and we’re getting it ready. Come
                  back to this page for updates on your shipment status.
                </p>
              </div>
              <div className="pt-4">
                <h4 className="mb-2 font-medium">Other tracking number:</h4>
                <p className="text-sm">Number: CNB21441622</p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-300 p-4">
              <h4 className="mb-2 font-medium">Order updates</h4>
              <p className="text-sm">
                You’ll get shipping and delivery updates by email and text.
              </p>
            </div>
            <div className="flex w-full justify-center pt-4 md:justify-between">
              <p className="hidden cursor-pointer items-center space-x-2 text-sm text-blue-500 hover:underline md:flex ">
                Need help?
              </p>
              <Button
                onClick={() => router.push('/')}
                title="Continue shopping"
                styles=" w-full md:w-fit"
                large
              />
            </div>
          </div>
        </section>

        {mounted && (
          <section className="order-first col-span-1 overflow-y-auto border-l border-gray-200 bg-gray-100 px-6 py-6 md:order-2 md:col-span-5 lg:px-10">
            <div
              className="flex  justify-between py-4
   font-medium  transition-all md:hidden"
            >
              <button
                onClick={handleShowOrderDetail}
                className="flex items-center space-x-2 text-indigo-500"
              >
                <ShoppingCartIcon className="h-5 w-5 text-indigo-500" />
                <p className="">Show details</p>
                {orderDetail ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
              <h4 className="text-lg">{currencyFormat(subtotal)}</h4>
            </div>
            {isShowOrderDetail && (
              <div className="flex flex-col divide-y transition-all">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 text-sm font-medium"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-gray-300 p-4 ">
                        <div className="trasition relative h-7 w-7 animate-bounce space-x-4 ">
                          <Image
                            src={appleBlack}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <p className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-xs font-semibold text-gray-100 ">
                          {item.quantity}
                        </p>
                      </div>
                      <h4>{item.description}</h4>
                    </div>
                    <h4>{currencyFormat(item.amount_subtotal / 100)}</h4>
                  </div>
                ))}
                <div className="space-y-2 py-6">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <p className="font-normal text-gray-600">Subtotal</p>
                    <p>{currencyFormat(subtotal)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <p className="font-normal text-gray-600">Discount</p>
                    <p> yen</p>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <p className="font-normal text-gray-600">Shipping</p>
                    <p>{} yen</p>
                  </div>
                </div>
                <div className="space-y-2 pt-6 pb-10">
                  <div className="flex items-center justify-between text-lg font-semibold ">
                    <p className="text-base">Total</p>
                    <p>{currencyFormat(subtotal)}</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Success

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  query,
}) => {
  const sessionId = query.session_id as string
  const products = await fetchLineItems(sessionId)

  return {
    props: {
      products,
    },
  }
}
