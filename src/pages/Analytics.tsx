
import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { useUser } from '../store/user'
import { useProgress } from '../store/progress'

function toCSV(rows: string[][]){ return rows.map(r => r.map(c => `"${String(c).replaceAll('"','""')}"`).join(',')).join('\n') }

export default function Analytics({back}:{back:()=>void}){
  const { user } = useUser(); const { p } = useProgress()
  const rows: string[][] = [["EmployeeID","Name","XP","AssessmentScore","LessonID","LessonScore","CompletedAt"]]
  Object.entries(p.completed).forEach(([id,info])=>{ rows.push([user?.id||'', user?.name||'', String(p.xp), p.assessment?.score?.toString()||'', id, String(info.score), info.date]) })
  if(Object.keys(p.completed).length===0){ rows.push([user?.id||'', user?.name||'', String(p.xp), p.assessment?.score?.toString()||'', '', '', '']) }
  const csv = toCSV(rows)
  const download=()=>{ const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`salaryse-training-analytics-${(new Date()).toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url) }
  return (<div className="p-6 max-w-4xl mx-auto space-y-4"><Button variant="ghost" onClick={back}>← Back</Button><div className="text-2xl font-bold">Analytics (Local)</div><Card className="space-y-2"><div><span className="opacity-70">Employee ID:</span> {user?.id}</div><div><span className="opacity-70">Name:</span> {user?.name}</div><div><span className="opacity-70">XP:</span> {p.xp}</div><div><span className="opacity-70">Assessment:</span> {p.assessment?.score ?? '-'}%</div></Card><Card className="space-y-2"><div className="font-semibold">Lessons Completed</div><div className="grid md:grid-cols-2 gap-2">{Object.entries(p.completed).map(([id,info])=> (<div key={id} className="text-sm bg-white/5 border border-white/10 rounded-xl2 p-2"><div className="font-mono">{id}</div><div>Score: {info.score}%</div><div className="opacity-70 text-xs">{new Date(info.date).toLocaleString()}</div></div>))}{Object.keys(p.completed).length===0 && <div className="opacity-60">No lessons completed yet.</div>}</div></Card><Button onClick={download}>Export CSV</Button><div className="text-xs opacity-60">Later: connect a Google Apps Script Web App to pipe these rows into a Google Sheet.</div></div>)
}
