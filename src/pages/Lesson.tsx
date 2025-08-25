
import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { MODULES } from '../data/modules'
import { useProgress } from '../store/progress'

export default function Lesson({id, back}:{id:string, back:()=>void}){
  const mod = MODULES.find(m=>m.id===id)!; const { completeLesson, p } = useProgress()
  const [answers,setAnswers]=React.useState<number[]>(Array(mod.quiz.length).fill(-1)); const [score,setScore]=React.useState<number|undefined>(p.completed[id]?.score)
  const submit=()=>{ let s=0; answers.forEach((a,i)=> { if (a===mod.quiz[i].answer) s++ }); const pct = Math.round((s/mod.quiz.length)*100); setScore(pct); completeLesson(id, pct) }
  return (<div className="p-6 max-w-3xl mx-auto space-y-6"><Button variant="ghost" onClick={back}>← Back</Button><div className="text-2xl font-bold">{mod.title}</div><Card className="space-y-3">{mod.slides.map((t,i)=> <div key={i} className="opacity-90">{t}</div>)}</Card><div className="space-y-3"><div className="text-lg font-semibold">Quick Quiz</div>{mod.quiz.map((q,i)=>(<Card key={i} className="space-y-2"><div className="font-medium">{i+1}. {q.q}</div><div className="grid gap-2">{q.options.map((opt: string, j:number)=>(<label key={j} className="flex items-center gap-2 cursor-pointer"><input type="radio" name={`q${i}`} checked={answers[i]===j} onChange={()=>{ const a=[...answers]; a[i]=j; setAnswers(a) }}/><span>{opt}</span></label>))}</div></Card>))}<Button onClick={submit}>Submit</Button>{score!==undefined && <div className="text-lg font-semibold">Score: {score}%</div>}</div></div>)
}
