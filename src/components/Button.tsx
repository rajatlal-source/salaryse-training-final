
import { ReactNode } from 'react'
export default function Button({children,onClick,className='',variant='primary'}:{children:ReactNode,onClick?:()=>void,className?:string,variant?:'primary'|'secondary'|'ghost'}){
  const base='px-4 py-2 rounded-xl2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ss-yellow transition'
  const styles={ primary:'bg-ss-purple hover:opacity-90 text-white', secondary:'bg-transparent border border-white/20 hover:border-white/40', ghost:'bg-transparent text-white/80 hover:text-white' } as const
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>{children}</button>
}
