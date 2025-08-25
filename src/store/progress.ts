
import { useEffect, useState } from 'react'
export type Progress = { xp:number; completed:Record<string,{score:number;date:string}>; day:number; assessment?:{score:number;date:string} }
const KEY='ss-progress'
const initial: Progress = { xp:0, completed:{}, day:1 }
export function useProgress(){
  const [p,setP]=useState<Progress>(()=>{ try { return JSON.parse(localStorage.getItem(KEY) || JSON.stringify(initial)) } catch { return initial } })
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(p)) }, [p])
  const completeLesson=(id:string,score:number)=> setP(prev=>{
    const already=prev.completed[id]; if(already && already.score>=score) return prev
    const xpGain=10 + (score>=80?40:0)
    return {...prev, xp: prev.xp + xpGain, completed:{...prev.completed, [id]:{score, date:new Date().toISOString()}}}
  })
  const setDay=(d:number)=> setP(prev=>({...prev, day:d}))
  const setAssessment=(score:number)=> setP(prev=>({...prev, assessment:{score, date:new Date().toISOString()}}))
  const reset=()=> setP(initial)
  return { p, completeLesson, setDay, setAssessment, reset }
}
