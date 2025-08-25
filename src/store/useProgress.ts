import { useEffect, useState } from 'react'

export type Progress = Record<string, number>
const KEY = 'ss-cc-progress'

export function useProgress(){
  const [progress, setProgress] = useState<Progress>(()=>{
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
  })
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(progress)) }, [progress])
  const mark = (lessonId: string, pct: number) => setProgress(p => ({...p, [lessonId]: Math.max(p[lessonId]||0, pct)}))
  return { progress, mark }
}
