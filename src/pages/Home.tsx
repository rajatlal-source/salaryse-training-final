import Card from '../components/Card'
import Button from '../components/Button'
import ProgressRing from '../components/ProgressRing'
import { useProgress } from '../store/useProgress'

export default function Home({onOpenLesson,onOpenLibrary,onRolePlay,onAssessment,progress}:{onOpenLesson:(id:string)=>void,onOpenLibrary:()=>void,onRolePlay:()=>void,onAssessment:()=>void,progress:ReturnType<typeof useProgress>}){
  const modules = [
    { id:'star', title:'STAR Framework', dur:'3 min' },
    { id:'opening30', title:'Opening 30 Seconds', dur:'4 min' },
    { id:'objections', title:'Objection: Already have a card', dur:'5 min' },
  ]
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Hey Advisor, let’s close 3 today.</div>
          <div className="text-sm opacity-70">Pick a module to continue.</div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onOpenLibrary}>Objection Library</Button>
          <Button variant="secondary" onClick={onRolePlay}>Role‑Play</Button>
          <Button onClick={onAssessment}>Assessment</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(m=> (
          <Card key={m.id}>
            <div className="flex items-center gap-3">
              <ProgressRing value={progress.progress[m.id]||0} />
              <div className="flex-1">
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm opacity-70">{m.dur}</div>
              </div>
              <Button onClick={()=>onOpenLesson(m.id)}>Start</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
