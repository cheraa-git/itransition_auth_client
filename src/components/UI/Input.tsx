import { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
}

export const Input: FC<InputProps> = ({ label, className, ...args }) => {
  const inputClasses = 'border-b outline-none w-[300px] mb-4 p-1 ' + className
  return (
    <label className="text-gray-400">
      {label}
      <input {...args} className={inputClasses}/>
    </label>
  )
}
