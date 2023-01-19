import React, { ButtonHTMLAttributes, FC } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  color?: 'primary' | 'lite'
}

export const Button: FC<ButtonProps> = ({ children, className, color, ...args }) => {
  const rootStyles = 'transition-all uppercase'
  let btnStyles =
    'bg-orange-600 text-white px-4 py-1 hover:bg-black hover:text-orange-600 font-bold '

  if (color === 'lite') {
    btnStyles = 'text-sm bg-orange-500 rounded p-1 hover:opacity-70 '
  }
  return (
    <button {...args} className={`${rootStyles} ${btnStyles} ${className}`}>{children}</button>
  )
}
