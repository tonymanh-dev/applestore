import React from 'react'
import { Tab } from '@headlessui/react'
import CardProduct from './CardProduct'

interface IProps {
  categories: Category[]
  products: Product[]
}
const Product = ({ categories, products }: IProps) => {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((item) => <CardProduct product={item} key={item._id} />)
  }
  return (
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
  )
}

export default Product
