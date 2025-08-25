
import React from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import { useUser } from '../store/user'
import { useProgress } from '../store/progress'
export default function Login({onEnter}:{onEnter:()=>void}){
  const { user, setUser } = useUser(); const { reset } = useProgress()
  const [id,setId]=React.useState(user?.id||''); const [name,setName]=React.useState(user?.name||'')
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); if(!id.trim()||!name.trim()) return; setUser({id,name}); reset(); onEnter() }
  return (<div className="min-h-screen grid place-items-center p-6"><Card className="w-full max-w-md space-y-4"><div className="text-2xl font-bold">Sign in</div><form onSubmit={submit} className="space-y-3"><div><label className="text-sm opacity-80">Employee ID</label><input value={id} onChange={e=>setId(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl2 bg-white/5 border border-white/10" required/></div><div><label className="text-sm opacity-80">Name</label><input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl2 bg-white/5 border border-white/10" required/></div><Button>Enter Training</Button></form><div className="text-xs opacity-60">Progress is saved on this device. You can export analytics anytime.</div></Card></div>)
}
