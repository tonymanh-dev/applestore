import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ipadHero } from '../utils/contants'
import Button from './Button'

const Header = () => {
  return (
    <section className="relative sticky top-0 flex h-screen max-w-[1300px] items-center  justify-center pb-20  md:pb-0">
      <div className="grid grid-cols-1 gap-y-10 px-4 md:grid-cols-3 md:gap-y-0 md:px-20">
        <div className="col-span-2 flex h-[450px] justify-center px-0 pt-[130px] text-center transition-all duration-300 sm:px-10 md:h-full md:pr-10 md:pt-0">
          <Image src={ipadHero} width={450} height={500} objectFit="contain" />
        </div>
        <div className="z-10 col-span-1 ml-0 flex flex-col items-center justify-center  text-center md:-ml-[100px]">
          <h1 className="text-xl font-semibold opacity-75">iPad Air</h1>
          <h2 className="bg-gradient-to-r from-sky-500 via-purple-500 to-rose-400 bg-clip-text text-4xl font-bold leading-relaxed tracking-wide text-transparent">
            cute. It's like magic
          </h2>
          <p className="mt-2 text-lg opacity-75">
            From 68,800 yen (tax included)
          </p>
          <div className="mt-4 flex items-center justify-center space-x-8">
            <Button title="Order now" />
            <span className="relative cursor-pointer font-medium opacity-75 hover:underline hover:opacity-100">
              Learn more
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
