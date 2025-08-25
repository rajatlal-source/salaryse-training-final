import { ReactNode } from 'react'
export default function Card({children,className=''}:{children:ReactNode,className?:string}){
  return <div className={`rounded-xl2 bg-white/5 backdrop-blur-sm border border-white/10 p-4 ${className}`}>{children}</div>
}
