import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import { selectCartItems } from '../redux/CartSlice'
import { logo, navLink } from '../utils/contants'
// import { signIn, signOut, useSession } from 'next-auth/react'

// Add feature google auth later
const Navbar = () => {
  // const session = useSession()
  const items = useSelector(selectCartItems)
  const session = false

  return (
    <header className="sticky top-0 z-30 flex h-[50px] w-full items-center justify-between  bg-[#323232] px-4 md:px-8">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-10 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image src={logo} layout="fill" objectFit="contain" />
          </div>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        {navLink.map((item) => (
          <a
            key={item}
            href="/"
            className="cursor-pointer text-sm text-gray-100 opacity-75 transition hover:opacity-100"
          >
            {item}
          </a>
        ))}
      </div>
      <div className="-mr-2 flex items-center gap-3 ">
        <div className="hidden cursor-pointer p-2 text-gray-100 opacity-75 hover:opacity-100 sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[18px] w-[18px] transition "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <Link href="checkout">
          <div className="relative hidden p-2 sm:flex">
            {items.length > 0 && (
              <span className="absolute top-0 right-0 z-[99] m-auto flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[10px] font-medium text-white">
                {items.length}
              </span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer  text-gray-100 opacity-75 transition hover:opacity-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        </Link>
        <div className="relative cursor-pointer p-2 text-gray-100 opacity-75 hover:opacity-100">
          {session ? (
            <span className="flex">
              <Image
                src="https://img.seadn.io/files/0996c2cc8697727947c8bf3682c99a58.png?fit=max&w=1000"
                width={26}
                height={26}
                className="rounded-full transition"
                onClick={() => {}}
              />
            </span>
          ) : (
            <span className="" onClick={() => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
