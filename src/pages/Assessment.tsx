
import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { MODULES } from '../data/modules'
import { useProgress } from '../store/progress'

export default function Assessment({back}:{back:()=>void}){
  const { setAssessment, p } = useProgress()
  const qbank = MODULES.flatMap(m=> m.quiz.map(q=>({ ...q, from:m.id })))
  const Q = qbank.slice(0, Math.min(20, qbank.length))
  const [answers,setAnswers]=React.useState<number[]>(Array(Q.length).fill(-1))
  const [done,setDone]=React.useState(false)
  const [score,setScore]=React.useState<number|undefined>(p.assessment?.score)
  const submit=()=>{ let s=0; answers.forEach((a,i)=>{ if(a===Q[i].answer) s++ }); const pct=Math.round((s/Q.length)*100); setScore(pct); setAssessment(pct); setDone(true) }
  return (<div className="p-6 max-w-4xl mx-auto space-y-6"><Button variant="ghost" onClick={back}>← Back</Button><div className="text-2xl font-bold">Final Assessment</div>{Q.map((q,i)=>(<Card key={i} className="space-y-2"><div className="font-medium">{i+1}. {q.q}</div>{q.options.map((opt:string,j:number)=>(<label key={j} className="flex items-center gap-2 cursor-pointer"><input type="radio" name={`qa${i}`} checked={answers[i]===j} onChange={()=>{ const a=[...answers]; a[i]=j; setAnswers(a) }}/><span>{opt}</span></label>))}</Card>))}<Button onClick={submit}>Submit Assessment</Button>{score!==undefined && <div className="text-xl font-semibold">Final Score: {score}% {score>=80?'✅ Passed':'❌ Try again'}</div>}{done && <div className="text-sm opacity-70">Your result is saved locally. Export from Analytics.</div>}</div>)
}
