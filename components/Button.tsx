import React from 'react'

interface IProps {
  title: string
  onClick?: () => void
  loading?: boolean
  large?: string
  icon?: boolean
  padding?: string
}

const Button = ({ title, onClick, loading, large, icon, padding }: IProps) => {
  return (
    <button
      className={`${
        large ? 'px-10 py-3 text-lg ' : 'px-6 py-2 '
      } ${padding} group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium text-white shadow-xl transition duration-300 ease-out hover:ring-1 hover:ring-purple-500`}
      onClick={onClick}
    >
      <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-sky-500 via-purple-600 to-rose-500"></span>
      <span className="ease absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-24 rotate-45 transform rounded-full bg-pink-500 opacity-30 transition duration-500 group-hover:rotate-90"></span>
      <span className="relative z-20 flex items-center">
        {icon && (
          <svg
            className="relative mr-2 h-5 w-5 flex-shrink-0 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        )}
        {loading ? 'Loading...' : title}
      </span>
    </button>
  )
}

export default Button
