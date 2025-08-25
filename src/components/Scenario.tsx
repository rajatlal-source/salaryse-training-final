import Card from './Card'
import Button from './Button'
import React from 'react'

export type Turn = { who: 'customer'|'you', text: string }
export type Choice = { label: string, next: number, impact: number }
export type Node = { turn: Turn, choices?: Choice[] }

export default function Scenario({flow,onComplete}:{flow:Node[], onComplete:()=>void}){
  const [ix,setIx]=React.useState(0)
  const [score,setScore]=React.useState(0)
  const n=flow[ix]

  const pick=(c:Choice)=>{ setScore(s=>s+c.impact); const next=c.next; if(next<0){ onComplete(); } else setIx(next) }

  return (
    <Card>
      <div className="space-y-3">
        <div className="text-sm opacity-80">Live Call Simulator</div>
        <div className="text-base"><span className="opacity-70">{n.turn.who==='customer'?'Customer:':'You:'}</span> {n.turn.text}</div>
        {n.choices && (
          <div className="grid gap-2">
            {n.choices.map((c,i)=> <Button key={i} variant="secondary" onClick={()=>pick(c)}>{c.label}</Button>)}
          </div>
        )}
        <div className="text-xs opacity-60">Momentum: {Math.min(100,Math.max(0,score))}%</div>
      </div>
    </Card>
  )
}
