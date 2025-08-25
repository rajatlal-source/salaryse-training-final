
import { useEffect, useState } from 'react'
export type User = { id: string; name: string; email?: string }
const KEY = 'ss-user'
export function useUser(){
  const [user, setUser] = useState<User | null>(()=>{
    try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch { return null }
  })
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(user)) }, [user])
  return { user, setUser }
}
