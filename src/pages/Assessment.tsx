import Button from '../components/Button'
import Card from '../components/Card'

export default function Assessment({onBack}:{onBack:()=>void}){
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <Button variant="secondary" onClick={onBack}>Back</Button>
      <Card>
        <div className="space-y-3">
          <div className="text-lg font-semibold">Final Assessment</div>
          <div className="opacity-80">(Coming next) 15 mixed Qs — pass with ≥80% to unlock certificate.</div>
        </div>
      </Card>
    </div>
  )
}
