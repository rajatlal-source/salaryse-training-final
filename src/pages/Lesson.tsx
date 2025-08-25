import Quiz from '../components/Quiz'
import Scenario from '../components/Scenario'
import Card from '../components/Card'
import Button from '../components/Button'
import { useProgress } from '../store/useProgress'
import React from 'react'

const starQuiz = [
  { id:'q1', q:'Which part of STAR creates urgency?', options:['S — Start','A — Activate','R — Resolve','T — Target'], correct:1, rationale:'Activate is where we create time‑bound urgency.' },
  { id:'q2', q:'Best opener length?', options:['5s','10s','30s','60s'], correct:1, rationale:'Aim to land value within ~10 seconds.' }
]

const objectionFlow = [
  { turn:{ who:'customer', text:'I already have a credit card.' }, choices:[
    { label:'Great, then you don’t need ours.', next:1, impact:-20 },
    { label:'Perfect — this adds UPI credit on demand; keep both for flexibility. Want me to check eligibility? 60 seconds.', next:2, impact:+40 },
    { label:'We’re better than your card.', next:1, impact:-10 }
  ]},
  { turn:{ who:'you', text:'(Momentum drops. Try reframing with added value.)' }, choices:[
    { label:'It’s free anyway, just take it.', next:2, impact:+5 },
    { label:'It gives instant UPI access even when cash is tight — handy mid‑month.', next:2, impact:+25 }
  ]},
  { turn:{ who:'customer', text:'Hmm, okay. How fast is approval?' }, choices:[
    { label:'5 minutes. Let’s check now?', next:-1, impact:+35 }
  ]}
]

export default function Lesson({id,onBack}:{id:string,onBack:()=>void}){
  const { mark } = useProgress()
  const [phase,setPhase]=React.useState<'learn'|'quiz'|'scenario'|'done'>('learn')

  const title = id==='star' ? 'STAR Framework' : id==='opening30' ? 'Opening 30 Seconds' : 'Objection: Already have a card'

  const complete=(pct:number)=>{ mark(id,pct) }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <div className="text-xl font-semibold">{title}</div>
      </div>

      {phase==='learn' && (
        <Card>
          <div className="space-y-3">
            <div className="text-lg font-semibold">S — Start with Impact</div>
            <div className="opacity-80">Open strong in ~10 seconds. Lead with benefit and exclusivity.</div>
            <div className="text-lg font-semibold">T — Target Pain</div>
            <div className="opacity-80">Call out liquidity crunch, approvals, emergencies, weak rewards.</div>
            <div className="text-lg font-semibold">A — Activate Urgency</div>
            <div className="opacity-80">Time‑bound, scarce, hold the offer for a few minutes.</div>
            <div className="text-lg font-semibold">R — Resolve & Close</div>
            <div className="opacity-80">Handle objections and assume the close.
            </div>
            <Button onClick={()=>{ setPhase('quiz'); complete(30) }}>Quick Quiz</Button>
          </div>
        </Card>
      )}

      {phase==='quiz' && (
        <Quiz items={starQuiz} onComplete={()=>{ setPhase('scenario'); complete(65) }} />
      )}

      {phase==='scenario' && (
        <Scenario flow={objectionFlow} onComplete={()=>{ setPhase('done'); complete(100) }} />
      )}

      {phase==='done' && (
        <Card>
          <div className="space-y-3">
            <div className="text-lg font-semibold">Great work!</div>
            <div className="opacity-80">You completed this lesson. Try the assessment next.</div>
            <Button onClick={onBack}>Back to Home</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
