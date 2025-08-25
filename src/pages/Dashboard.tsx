
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressRing from '../components/ProgressRing'
import Badge from '../components/Badge'
import { MODULES } from '../data/modules'
import { useProgress } from '../store/progress'
import { useUser } from '../store/user'

export default function Dashboard({openLesson,openAssessment,openAnalytics}:{openLesson:(id:string)=>void,openAssessment:()=>void,openAnalytics:()=>void}){
  const { p, setDay } = useProgress(); const { user } = useUser()
  const completedCount = Object.keys(p.completed).length; const total = MODULES.length; const pct = Math.round((completedCount/total)*100)
  const dayRanges={1:[0,6],2:[6,12],3:[12,17]} as const; const [start,end]=dayRanges[p.day]; const todays = MODULES.slice(start,end)
  return (<div className="p-6 max-w-6xl mx-auto space-y-6"><div className="flex items-center justify-between"><div><div className="text-xl font-semibold">Hey {user?.name||'Advisor'}, Day {p.day} Target 🎯</div><div className="opacity-70 text-sm">Complete today's modules (~1 hour). Earn XP to level up.</div></div><div className="flex items-center gap-4"><div className="text-center"><ProgressRing value={pct}/><div className="text-xs mt-1 opacity-70">{pct}%</div></div><Card><div className="text-sm">XP</div><div className="text-2xl font-bold">{p.xp}</div></Card></div></div><div className="flex items-center gap-2"><Badge label={`Day ${p.day}`}/><Badge label={`${completedCount}/${total} modules`}/><Button variant="secondary" onClick={()=> setDay(p.day===3?1:p.day+1)}>Switch Day</Button><Button variant="secondary" onClick={openAnalytics}>Analytics</Button></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{todays.map(m=>{ const done=!!p.completed[m.id]; return (<Card key={m.id} className="space-y-2"><div className="text-lg font-semibold">{m.title}</div><div className="text-sm opacity-70">{m.minutes} min</div><div className="flex items-center justify-between"><div className="text-xs opacity-60">{done?`Score: ${p.completed[m.id].score}%`:'Not started'}</div><Button onClick={()=>openLesson(m.id)}>{done?'Review':'Start'}</Button></div></Card>)})}</div>{completedCount>=total && (<Card className="flex items-center justify-between"><div><div className="font-semibold">Final Assessment unlocked</div><div className="text-sm opacity-70">20 questions from all modules</div></div><Button onClick={openAssessment}>Take Assessment</Button></Card>)}</div>)
}
