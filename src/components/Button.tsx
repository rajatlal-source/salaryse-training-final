import { ReactNode } from 'react'
export default function Button({children, onClick, variant='primary', className=''}:{children:ReactNode,onClick?:()=>void,variant?:'primary'|'secondary'|'ghost',className?:string}){
  const base = 'px-4 py-2 rounded-xl2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ss-yellow'
  const styles = {
    primary: 'bg-ss-purple text-white hover:opacity-90',
    secondary: 'bg-transparent border border-white/20 hover:border-white/40',
    ghost: 'bg-transparent text-white/80 hover:text-white'
  } as const
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>{children}</button>
}
