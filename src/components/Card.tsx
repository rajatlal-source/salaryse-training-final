
import { ReactNode } from 'react'
export default function Card({children,className=''}:{children:ReactNode,className?:string}){
  return <div className={`bg-[var(--card)] border border-[var(--border)] rounded-xl2 p-4 ${className}`}>{children}</div>
}
