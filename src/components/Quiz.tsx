import Card from './Card'
import Button from './Button'
import React from 'react'

export type QuizQ = { id: string, q: string, options: string[], correct: number, rationale: string }

export default function Quiz({items, onComplete}:{items:QuizQ[], onComplete:()=>void}){
  const [ix, setIx] = React.useState(0)
  const [sel, setSel] = React.useState<number|null>(null)
  const q = items[ix]

  const check = (i:number)=>{ setSel(i) }
  const next = ()=>{
    if(ix === items.length-1){ setTimeout(onComplete, 300) }
    else { setIx(ix+1); setSel(null) }
  }

  return (
    <Card>
      <div className="space-y-3">
        <div className="text-sm opacity-80">Question {ix+1}/{items.length}</div>
        <div className="text-lg font-semibold">{q.q}</div>
        <div className="space-y-2">
          {q.options.map((opt,i)=>{
            const isCorrect = sel!==null && i===q.correct
            const isWrong = sel!==null && i===sel && i!==q.correct
            return (
              <button key={i} onClick={()=>check(i)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition ${sel===null?'border-white/10 hover:border-white/30':'border-white/10'} ${isCorrect?'bg-green-600/20 border-green-400/40': ''} ${isWrong?'bg-red-600/10 border-red-400/40':''}`}>
                {opt}
              </button>
            )
          })}
        </div>
        {sel!==null && (
          <div className="text-sm opacity-80">
            {sel===q.correct ? 'Correct! ' : 'Not quite. '} {q.rationale}
          </div>
        )}
        <div className="pt-2">
          {sel!==null && <Button onClick={next}>{ix===items.length-1? 'Finish' : 'Next'}</Button>}
        </div>
      </div>
    </Card>
  )
}
