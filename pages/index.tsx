import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useSelector } from 'react-redux'
import { Tab } from '@headlessui/react'

import Cart from '../components/Cart'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from '../utils/fetchProducts'
import CardProduct from '../components/CardProduct'
import { selectCartItems } from '../redux/CartSlice'

interface IProps {
  categories: Category[]
  products: Product[]
  session: Session | null
}

const Home = ({ categories, products }: IProps) => {
  const items = useSelector(selectCartItems)

  //Show products by category
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((item) => <CardProduct product={item} key={item._id} />)
  }

  return (
    <div className="">
      <Head>
        <title>Apple Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="relative h-[200vh] bg-white">
        {items.length > 0 && <Cart />}
        <Header />
      </main>
      <section className="relative z-40 -mt-[90vh] min-h-screen bg-black">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-lg font-semibold text-gray-100 md:text-2xl">
            New Products
          </h1>

          <div className="px-4">
            <Tab.Group>
              <Tab.List className="sapce-x-4 flex justify-center">
                {categories.map((item) => (
                  <Tab
                    key={item._id}
                    id={item._id}
                    className={({ selected }) =>
                      ` whitespace-nowrap rounded-t-lg px-5 py-3  text-sm font-medium outline-none md:px-6 md:text-base ${
                        selected
                          ? 'lineGradient bg-neutral-800 text-gray-50'
                          : 'border-b-2 border-neutral-800 text-gray-300'
                      }`
                    }
                  >
                    {item.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
                <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
                <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
                <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
                <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home

// Backend
export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(context)

  return {
    props: {
      categories,
      products,
      session,
    },
  }
}
