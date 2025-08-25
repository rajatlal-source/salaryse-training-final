import Card from '../components/Card'
import Button from '../components/Button'

const ITEMS = [
  { title:'Already have a card', best:'Perfect — this adds UPI credit on demand. Keep both for flexibility. Shall I check eligibility? 60 seconds.', why:'Validates, adds new value, and makes a low‑friction ask.' },
  { title:'Rates are high', best:'Zero interest when you pay on time — like an interest‑free buffer each month.', why:'Reframes credit card vs loan; focuses on on‑time benefit.' },
]

export default function Library({onBack}:{onBack:()=>void}){
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <Button variant="secondary" onClick={onBack}>Back</Button>
      <div className="text-xl font-semibold">Objection Library</div>
      <div className="space-y-3">
        {ITEMS.map((it,i)=> (
          <Card key={i}>
            <div className="space-y-1">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm">Best Reply: {it.best}</div>
              <div className="text-xs opacity-70">Why it works: {it.why}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
